import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = props => {

    const {isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        All Topics
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Books
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Movies
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Music
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Games
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>
            </>
        )
    }

    const authenticatedNavbar = () => {
        return (
            <>
            <Link to="/">
                <li className="nav-item nav-link">
                    Home
                </li>
            </Link>
            <Link to="/">
                <li className="nav-item nav-link">
                    All Topics
                </li>
            </Link>
            <Link to="/">
                <li className="nav-item nav-link">
                    Books
                </li>
            </Link>
            <Link to="/">
                <li className="nav-item nav-link">
                    Movies
                </li>
            </Link>
            <Link to="/">
                <li className="nav-item nav-link">
                    Music
                </li>
            </Link>
            <Link to="/">
                <li className="nav-item nav-link">
                    Games
                </li>
            </Link>
            <Link to="/">
                <li className="nav-item nav-link">
                    Login
                </li>
            </Link>
            {
                user.role === "admin" ? 
                <Link to="/admin">
                    <li className="nav-item nav-link">
                        Admin
                    </li>
                </Link> : null
            }
            <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>
                Logout
            </button>
        </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">Discussion Camp</div>
            </Link>
            <div className="collapse navbar-collapse" is="navbarText">
                <ul className="navbar-nav mr-auto">
                    { !isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;