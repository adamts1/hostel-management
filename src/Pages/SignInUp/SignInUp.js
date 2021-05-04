import './SignInUp.css'
import { Container, Form, Image, Button } from 'react-bootstrap';
import { BsHouseFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


function SignInUp(props) {
  const type = props.type
  return (
    <div className='p-login'>
      <Container>
        <section>
          <div className="form-warper">
            <Form>
              <h3><BsHouseFill className="iconWarper" className="icon" />{props.type}</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Enter Password" />
              </Form.Group>
              {type == "Signup"
                ?
                <div>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Renter Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Enter Username" />
                  </Form.Group>
                </div>
                : null
              }

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <hr />
              {type == "Signup"
                ? <Link to="/login"><span><a href="">Can't log in? Sign up for an account</a></span></Link>
                : <Link to="/signup"><span><a href="">Already have an account? Log In</a></span></Link>
              }

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </section>
      </Container>
    </div >
  );
}

export default SignInUp;
