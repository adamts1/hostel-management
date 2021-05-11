import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage'
import SignInUp from './Pages/SignInUp/SignInUp'
import HostelsPage from './Pages/HostelsPage/HostelsPage'
import HostelPage from './Pages/HostelPage/HostelPage'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import UserModel from './Model/UserModel';
import Parse from 'parse'

function App() {
  const [activeUser ,setActiveUser] = useState(UserModel.loadActiveUser());

  const logoutHanler = () => {
    setActiveUser(null);
    Parse.User.logOut();
  }
  
  return (
    <div className="App">
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
          <Route exact path="/hostelspage">
             <NavBar activeUser={activeUser} onLogout={logoutHanler}/>
             <HostelsPage activeUser={activeUser} />
             <Footer/>
          </Route>
          <Route exact path="/hostel/:index">
             <NavBar activeUser={activeUser} onLogout={logoutHanler}/>
             <HostelPage activeUser={activeUser} />
             <Footer/>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
