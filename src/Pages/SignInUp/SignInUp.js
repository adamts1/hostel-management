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
  const [username, setUsername] = useState("")
  const [showInvalidLogin, setShowInvalidLogin] = useState(false);

  if (activeUser) {
    return <Redirect to="/adminMain"/>
}

async function login(e) {
  e.preventDefault();

  try{
    const activeUser = UserModel.login(email,pwd)
    onLogin(activeUser)
  }catch{
    setShowInvalidLogin(true)
  }
}


 function signup(e) {
  e.preventDefault();

  const user = new Parse.User()
  user.set('username', username);
  user.set('email', email);
  user.set('password', pwd);
  
  user.signUp().then((parseUser) => {
    const activeUser = new UserModel(parseUser);
    onLogin(activeUser);
  }).catch(error => {
    setShowInvalidLogin(true)
    console.error('Error while signing up user', error);
  });
  }

  if(type == "Signup") {
    return (
      <div className='p-login'>
        <Container>
          <section>
            <div className="form-warper">
                <Form onSubmit={signup}> 
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
              <Form.Group controlId="formBasicCheckbox">
                      <Form.Control 
                        type="text" 
                        placeHolder="Enter Username"
                        value={username} 
                        onChange={e => setUsername(e.target.value)} />
                      </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <hr />
                <Link to="/login"><span><a href="">Can't log in? Sign up for an account</a></span></Link>
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
    return (
      <div className='p-login'>
        <Container>
          <section>
            <div className="form-warper">
    
                <Form onSubmit={login}> 
                <h3><BsHouseFill className="iconWarper" className="icon" />{type}</h3>
                {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
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
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <hr />
                <Link to="/login"><span><a href="">Can't log in? Sign up for an account</a></span></Link>
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
