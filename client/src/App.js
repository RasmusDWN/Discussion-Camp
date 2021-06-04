import { BrowserRouter, Switch, Route} from 'react-router-dom';
import React from 'react';

import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
   return (
     <BrowserRouter>
         <div className="container">
            <Navbar />
            <Switch>
               <Route path="/" exact component={Home} />
            </Switch>
        </div>
     </BrowserRouter>
  );
}

export default App;
