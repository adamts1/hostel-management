import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage'
import SignInUp from './Pages/SignInUp/SignInUp'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <HashRouter>
       
        <Switch>
          <Route exact path="/">
             <NavBar/>
             <LandingPage/>
             <Footer/>
          </Route>
          <Route exact path="/login">
             <SignInUp type="Login"/>
             <Footer/>
          </Route>
          <Route exact path="/signup">
             <SignInUp type="Signup"/>
             <Footer/>
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
