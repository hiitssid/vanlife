import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const activeSty = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      <nav className="host-nav">
        <NavLink
          end
          to="/host"
          style={({ isActive }) => {
            isActive ? activeSty : null;
          }}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/host/income"
          style={({ isActive }) => {
            isActive ? activeSty : null;
          }}
        >
          Income
        </NavLink>
        <NavLink
          to="/host/reviews"
          style={({ isActive }) => {
            isActive ? activeSty : null;
          }}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
