import { Router } from "@reach/router";
import React from 'react';

import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import PostPage from "./pages/PostPage";

function App() {
   return (
      <div className="container">
         <Router>       
               <Home path="/" />
               <TopicPage path="/topics/:id" />
               <PostPage path="/topics/:id/:postId" />
         </Router>
     </div>
  );
}

export default App;
