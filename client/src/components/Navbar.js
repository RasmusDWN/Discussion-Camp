import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">Discussion Camp</div>
            </Link>
        </nav>
    );
}