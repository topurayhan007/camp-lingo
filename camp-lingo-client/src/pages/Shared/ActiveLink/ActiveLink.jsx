import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => {
        return {
          fontWeight: isActive ? "bold" : "bold",
          color: isActive ? "#3ee779" : "",
          backgroundColor: "transparent",
        };
      }}
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
