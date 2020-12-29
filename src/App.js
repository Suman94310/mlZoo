import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "./components/navbar/navbar"
import Digit from "./components/digit/digit"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path={["/", "/digit"]}>
            <Digit/>
          </Route>
          <Route path="/object"></Route>
          <Route path="/baymax"></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
