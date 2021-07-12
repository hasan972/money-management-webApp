import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
