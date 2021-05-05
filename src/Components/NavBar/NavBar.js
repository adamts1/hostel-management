import './NavBar.css'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';


import { BsHouseFill } from 'react-icons/bs';





function NavBar({onLogout, activeUser}) {
    console.log("sss", activeUser)
    return (
        <div className="c-navbar">
            <header className="fixed-top">
                <Navbar className="p-3">
                    <div className='brand'>
                        <BsHouseFill className="iconWarper" className="icon" />
                        <Navbar.Brand href="#home">HOSTEL MANAGMENT</Navbar.Brand>
                    </div>
                    <div className="float-right buttons">
                        <Link to="/login"> 
                            <Button variant="outline-light text-dark">Log in</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="primary text-white">Sign up</Button>
                        </Link>
                        {activeUser ?<Link to="/"><Button variant="primary text-white" onClick={onLogout}>Logout</Button></Link>: null}
                            
                        
                    </div>
                </Navbar>
            </header>
        </div>
    );
}

export default NavBar;