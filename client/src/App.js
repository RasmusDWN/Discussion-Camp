import "./App.js";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import PostPage from "./pages/PostPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
   return (
     <Router>
        <Navbar />
        <Route exact path="/"  component={Home}/>
     </Router>
  );

}

export default App;
