import { NavLink } from "react-router-dom";
import './navbar.css';
function Navbar() {
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="navbar-brand">
            <h4>My app</h4>
        </div>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" >
                <li className="nav-item">
                <NavLink to={"/home"} className="nav-link">
                   Home
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to={"/create"} className="nav-link">
                    create project
                </NavLink>
                </li>
                <li className="nav-item">
                
                </li>
                <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                    logout
                </NavLink>
                </li>
            </ul>
        </div>
    </nav>;
}

export default Navbar;