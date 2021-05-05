import './SignInUp.css'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import SignInUpInput from '../../Components/SignInUpInput/SignInUpInput'
import UserModel from '../../Model/UserModel'
import { BsHouseFill } from 'react-icons/bs';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Parse from 'parse'


function SignInUp({ onLogin, activeUser, type}) {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [showInvalidLogin, setShowInvalidLogin] = useState(false);

  if (activeUser) {
    return <Redirect to="/adminMain"/>
}

async function login(e) {
  e.preventDefault();

  Parse.User.logIn(email,pwd).then((user) => {
    const activeUser = new UserModel(user)
    onLogin(activeUser)
    console.log('Logged in user', user);
  }).catch(error => {
    console.error('Error while logging in user', error);
    setShowInvalidLogin(true)
  })
}

  // const type = props.type
  return (
    <div className='p-login'>
      <Container>
        <section>
          <div className="form-warper">
            <Form onSubmit={login}>
              <h3><BsHouseFill className="iconWarper" className="icon" />{type}</h3>
              {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}

              {/* <SignInUpInput type ="email" placeHolder="Enter Email" /> */}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Control 
                  type="email" 
                  placeHolder="Enter Email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Control 
                  type="password" 
                  placeHolder="Enter Password"
                  value={pwd} 
                  onChange={e => setPwd(e.target.value)} />
            </Form.Group>
              {/* <SignInUpInput type ="password" placeHolder="Enter Password" /> */}
              {/* {type == "Signup"
                ?
                <div>
                  <SignInUpInput type ="password" placeHolder="Renter Password" />
                  <SignInUpInput type ="text" placeHolder="Enter Username" />
                </div>
                : null
              } */}
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
