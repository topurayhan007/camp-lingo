import { NavLink } from "react-router-dom";

const SideActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => {
        return {
          fontWeight: isActive ? "bold" : "bold",
          color: isActive ? "black" : "",
          backgroundColor: isActive ? "#3ee779" : "",
          borderRadius: "20px",
        };
      }}
    >
      {children}
    </NavLink>
  );
};

export default SideActiveLink;
