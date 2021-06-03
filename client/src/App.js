import "./App.js";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import PostPage from "./pages/PostPage";
import {Router} from "@reach/router";

function App() {
  return (
     <Router>
        <TopicPage path="topics/:id" />  
        <PostPage path="posts/:id" />
        <Home path="/" />
     </Router>
     

  );

}

export default App;
