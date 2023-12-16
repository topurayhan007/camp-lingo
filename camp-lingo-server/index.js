const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// verify JWT
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }

  // bearer token
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kon9irj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    // Collections
    const usersCollection = client.db("campLingo").collection("users");
    const classesCollection = client.db("campLingo").collection("classes");
    const cartsCollection = client.db("campLingo").collection("carts");
    const paymentCollection = client.db("campLingo").collection("payments");

    // JWT
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
      });

      res.send({ token });
    });

    const verifyStudent = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "student") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }

      next();
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }

      next();
    };

    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "instructor") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }

      next();
    };

    // User related APIs

    // create a user if it is a new user (for social login/signup)
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // get all users (only admin access)
    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // get all instructors
    app.get("/users/instructors", async (req, res) => {
      const filter = {
        role: "instructor",
      };
      const result = await usersCollection.find(filter).toArray();
      res.send(result);
    });

    // verify if a user is student
    app.get("/users/student/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ student: false });
      }
      const query = {
        email: email,
      };
      const user = await usersCollection.findOne(query);
      const result = { student: user?.role === "student" };
      res.send(result);
    });

    // verify if a user is admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }
      const query = {
        email: email,
      };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result);
    });

    // verify if a user is instructor
    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ instructor: false });
      }
      const query = {
        email: email,
      };
      const user = await usersCollection.findOne(query);
      const result = { instructor: user?.role === "instructor" };
      res.send(result);
    });

    // update a user role = admin
    app.patch("/users/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // update a user role = instructor
    app.patch(
      "/users/instructor/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: "instructor",
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // ######  class related API  ######

    // add a class
    app.post("/classes", verifyJWT, verifyInstructor, async (req, res) => {
      const newClass = req.body;
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });

    // get all classes
    app.get("/classes", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    // get all approved classes
    app.get("/classes/approved", async (req, res) => {
      const filter = { status: "approved" };
      const result = await classesCollection.find(filter).toArray();
      res.send(result);
    });

    // get all classes of a instructor
    app.get(
      "/classes/instructor/:id",
      verifyJWT,
      verifyInstructor,
      async (req, res) => {
        const email = req.params.id;
        const filter = { instructorEmail: email };
        const result = await classesCollection.find(filter).toArray();
        res.send(result);
      }
    );

    // update instructor's class info
    app.patch(
      "/classes/instructor/:id",
      verifyJWT,
      verifyInstructor,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: req.body,
        };
        const result = await classesCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // update a class status = approved
    app.patch(
      "/classes/approve/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status: "approved",
          },
        };
        const result = await classesCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // update a class status = denied
    app.patch("/classes/deny/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "denied",
        },
      };
      const result = await classesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // give feedback to a class
    app.patch(
      "/classes/feedback/:id",
      verifyJWT,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            feedback: req.body.feedback,
          },
        };
        const result = await classesCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // popular classes and instructor related API
    // get top 6 popular classes
    app.get("/classes/popular", async (req, res) => {
      const filter = {
        status: "approved",
      };
      const sortOptions = {
        enrolled: -1,
      };

      const result = await classesCollection
        .find(filter)
        .sort(sortOptions)
        .limit(6)
        .toArray();
      res.send(result);
    });

    // top 6 popular instructors
    app.get("/users/instructors/popular", async (req, res) => {
      const pipeline = [
        {
          $match: {
            status: "approved",
          },
        },
        {
          $group: {
            _id: "$instructorEmail",
            totalEnrollment: { $sum: "$enrolled" },
          },
        },
        {
          $sort: {
            totalEnrollment: -1,
          },
        },
        {
          $limit: 6,
        },
      ];

      const result1 = await classesCollection.aggregate(pipeline).toArray();
      console.log(result1);
      const topInstructorsEmail = result1.map(({ _id }) => _id);
      // console.log(topInstructorsEmail);

      const filter = {
        email: { $in: topInstructorsEmail },
      };

      const result = await usersCollection.find(filter).toArray();
      console.log(result);

      const sortedResult = topInstructorsEmail.map((email) =>
        result.find((user) => user.email === email)
      );

      res.send(sortedResult);
    });

    // Cart related APIs

    // add class to cart
    app.post("/carts", verifyJWT, verifyStudent, async (req, res) => {
      const newClassItem = req.body;
      const result = await cartsCollection.insertOne(newClassItem);
      res.send(result);
    });

    // get added classes from cart
    app.get(
      "/carts/student/:id",
      verifyJWT,
      verifyStudent,
      async (req, res) => {
        const stuEmail = req.params.id;
        const filter = {
          email: stuEmail,
        };
        const result = await cartsCollection.find(filter).toArray();
        res.send(result);
      }
    );

    // delete class from cart
    app.delete("/carts/:id", verifyJWT, verifyStudent, async (req, res) => {
      const id = req.params.id;
      const filter = {
        _id: new ObjectId(id),
      };
      const result = await cartsCollection.deleteOne(filter);
      res.send(result);
    });

    // payment related API
    // create payment intent
    app.post(
      "/create-payment-intent",
      verifyJWT,
      verifyStudent,
      async (req, res) => {
        const { price } = req.body;
        const amount = parseInt(price * 100);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      }
    );

    // make payment, delete from cart, update class info (seat,enrolled)
    app.post("/payment", verifyJWT, verifyStudent, async (req, res) => {
      const payment = req.body;
      const id = payment.cartId;
      // insert into payment collection
      const insertResult = await paymentCollection.insertOne(payment);

      // update the available seat and enrolled count
      const classId = payment.classId;
      const filter = { _id: new ObjectId(classId) };
      const updateDoc = {
        $inc: {
          enrolled: 1,
          availableSeat: -1,
        },
      };
      const updateResult = await classesCollection.updateOne(filter, updateDoc);

      // delete the class from cart
      const query = {
        _id: new ObjectId(id),
      };
      const deleteResult = await cartsCollection.deleteOne(query);

      res.send({ insertResult, deleteResult, updateResult });
    });

    // enrolled class of a student using email (sort desc)
    app.get("/payment/:id", verifyJWT, verifyStudent, async (req, res) => {
      const stuEmail = req.params.id;
      const filter = {
        email: stuEmail,
      };
      const sortOptions = {
        date: -1,
      };
      const result = await paymentCollection
        .find(filter)
        .sort(sortOptions)
        .toArray();

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CampLingo is learning....");
});

app.listen(port, () => {
  console.log(`CampLingo is learning on port ${port}`);
});
