import "./App.js";
import Home from "./pages/Home";
import PostPage from "./pages/TopicPage";
import {Router} from "@reach/router";

function App() {
  return (
     <Router>
        <PostPage path="posts/:id" />  
        <Home path="/" />
     </Router>
     

  );

}

export default App;
