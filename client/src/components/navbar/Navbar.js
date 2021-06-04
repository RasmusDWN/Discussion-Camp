import { Link } from "react-router-dom";

export default function Navbar() {
    const user = null;

    return (
        <nav className="navbar navbar-light bg-light">
            <div component={Link} to="/" className="navbar-brand" variant="h2">Discussion Camp</div>
            
            <div className="toolbar">
                {user ? (
                    <div className="profile">
                        <div className="p3 mb-2 bg-purple text-white" alt={user.result.name}>{user.result.name.charAt(0)}</div>
                        <div className="username" variant="h6">{user.result.name}</div>
                        <button className="logout">Logout</button>
                    </div>
                ) : (
                    <Link to="/signin">Sign In</Link>
                )}
            </div>
        </nav>
        
    );
}
