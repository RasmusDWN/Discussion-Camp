import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    
    return (
        <nav className="navbar navbar-light bg-light">
            <Typography component={Link} to="/" className="navbar-brand" variant="h2">Discussion Camp</Typography>
            <Toolbar className="toolbar">
                {user ? (
                    <div className="profile">
                        <div className="p3 mb-2 bg-purple text-white" alt={user.result.name}>{user.result.name.charAt(0)}</div>
                        <div className="username" variant="h6">{user.result.name}</div>
                        <Button variant="contained" className="logout" color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </nav>
        
    );
}
