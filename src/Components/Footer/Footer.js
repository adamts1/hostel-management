import { BsHouseFill } from 'react-icons/bs';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import './Footer.css'


function Footer() {
  return (
    <div className='c-footer'>
        <footer  class="text-white text-dark">
          <div className="footer-personal-data">
            <ul>
              <li className='global-footer-list-item'>
                <a href="https://www.linkedin.com/in/adam-tsityat-05340a124/">LinkdIn</a>
              </li>
              <li className='global-footer-list-item'>
                <a href="https://adamts1.github.io/my-interactive-resume/">Personal Website</a>
              </li>
              <li className='global-footer-list-item'>
                <a href="https://github.com/adamts1/">GitHub</a>
              </li>
            </ul>
          </div>
          <p>
            <h4><BsHouseFill className="iconWarper" className="icon" />HOSTEL MANAGMENT</h4>
          </p>
          <div>
            <h5>Adam Tsityat</h5>
            <p> © Copyright 2021. All rights reserved.</p>
          </div>
        </footer>
    </div>
  );
}

export default Footer;
