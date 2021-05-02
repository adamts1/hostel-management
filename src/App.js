import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import NavBar from './Components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';

// import ReactDOM from 'react-dom'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faCheckSquare, faCoffee)




function App() {
  return (
    <>
      <HashRouter>
       
        <Switch>
          <Route exact path="/"> <NavBar/><LandingPage/></Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
