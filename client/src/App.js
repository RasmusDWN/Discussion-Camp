import "./App.js";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import {Router} from "@reach/router";

function App() {
  return (
     <Router>
       
              <Home path="/" />
     </Router>
     

  );

}

export default App;
