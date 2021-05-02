import './NavBar.css'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { IoTrashOutline, IoHomeOutline } from "react-icons/io5";





function NavBar() {
    return (
        <div className="c-navbar">
            <Navbar  bg="dark" variant="dark">
            <IoHomeOutline className="iconWarper"className="icon" />
            <Navbar.Brand href="#home">HOSTEL MANAGMENT</Navbar.Brand>
                <div className="button-warper">
                    <Button variant="outline-light">Log in</Button>
                    <Button variant="primary">Sign up</Button>    
                </div>                    
            </Navbar>
        </div>
    );
}

export default NavBar;