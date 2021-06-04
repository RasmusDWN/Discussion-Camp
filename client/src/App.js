import "./App.js";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import PostPage from "./pages/PostPage";
import {Router} from "@reach/router";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
   const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
   console.log(user)
   console.log(isAuthenticated);
   return (
     <Router>
        <TopicPage path="topics/:id" />  
        <PostPage path="posts/:id" />
        <Home path="/" />
     </Router>
     

  );

}

export default App;
