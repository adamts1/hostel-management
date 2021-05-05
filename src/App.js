import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage'
import SignInUp from './Pages/SignInUp/SignInUp'
import AdminMain from './Pages/AdminMainPage/AdminMainPage'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import UserModel from './Model/UserModel';
import Parse from 'parse'



function App() {
  const [activeUser ,setActiveUser] = useState(Parse.User.current() ? new UserModel(Parse.User.current()) : null);

  const logoutHanler = () => {
    setActiveUser(null);
    Parse.User.logOut();

  }
  
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
             <SignInUp type="Login" activeUser={activeUser} onLogin={user => setActiveUser(user)}/>
             <Footer/>
          </Route>
          <Route exact path="/signup">
             <SignInUp type="Signup" activeUser={activeUser} onLogin={user => setActiveUser(user)}/>
             <Footer/>
          </Route>
          <Route exact path="/adminMain">
             <NavBar activeUser={activeUser} onLogout={logoutHanler}/>
             <AdminMain />
             <Footer/>
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
