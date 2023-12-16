import { useState } from "react";
import ReviewCard from "../../../components/ReviewCard/ReviewCard";
import { Zoom } from "react-awesome-reveal";

const Reviews = () => {
  const customerReviews = [
    {
      id: 0,
      name: "Sophia Roberts",
      rating: 4.6,
      review:
        "I had an amazing time at the language summer camp. I learned French and the instructors were friendly and knowledgeable. Highly recommended!",
      image:
        "https://images.unsplash.com/photo-1660951381925-57ac7e40c40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 1,
      name: "Noah Anderson",
      rating: 5.0,
      review:
        "The language summer camp was an incredible experience! I chose to learn Spanish, and the classes were engaging and interactive. The camp had a great atmosphere, and I made new friends from different cultures.",
      image:
        "https://images.unsplash.com/photo-1618580633312-692aea0d55eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
    {
      id: 2,
      name: "Ella Thompson",
      rating: 4.8,
      review:
        "The language summer camp offered a variety of classes. I enrolled in Mandarin, and while the instructors were knowledgeable, I felt the pace was a bit too fast. Overall, it was a good learning experience.",
      image:
        "https://images.unsplash.com/photo-1596434300655-e48d3ff3dd5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2586&q=80",
    },
    {
      id: 3,
      name: "Oliver Wilson",
      rating: 4.5,
      review:
        "I had a fantastic time at the language summer camp. The German classes were engaging, and the instructors were patient and supportive. The camp organized fun cultural activities that enhanced my learning experience.",
      image:
        "https://images.unsplash.com/photo-1531311243148-d2653fa84700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    },
  ];

  const [reviews] = useState(customerReviews);
  // setReviews(customerReviews);

  return (
    <div className="my-32">
      <div className="max-w-7xl mx-auto text-center">
        <Zoom>
          <h2 className="text-2xl md:text-5xl pb-6 md:pb-12 font-bold text-green-500">
            Our Customer Reviews
          </h2>
        </Zoom>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-8 px-10 md:px-0">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review}></ReviewCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
