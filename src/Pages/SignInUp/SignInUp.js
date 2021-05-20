import './SignInUp.css'
import { Container, Form, Button, Alert } from 'react-bootstrap';
import SignInUpInput from '../../Components/SignInUpInput/SignInUpInput'
import UserModel from '../../Model/UserModel'
import { BsHouseFill } from 'react-icons/bs';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';

function SignInUp({ onLogin, activeUser, type }) {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [showInvalidLogin, setShowInvalidLogin] = useState(false);



  if (activeUser) {
    if (activeUser["tenant"]) {
      const tenantUrl = "/tenant/"+activeUser["id"]
      return <Redirect to={tenantUrl}/>  
    }else{
      return <Redirect to="/hostelspage"/>  
    }
    
  }


  async function login(e) {
    e.preventDefault();
    try {
      const activeUser = await UserModel.login(email, pwd);
      onLogin(activeUser);
    } catch (error) {
      console.error('Error while logging in user', error);
      setShowInvalidLogin(true);
    }
  }

  async function signup(e) {
    e.preventDefault();
    const activeUser = UserModel.signup(email, pwd, fname, lname)
    onLogin(activeUser)

  }

  if (type === "Signup") {
    return (
      <div className='p-login'>
        <Container>
          <section>
            <div className="form-warper">
              <Form onSubmit={signup}>
                <h3><BsHouseFill className="iconWarper" className="icon" />{type}</h3>
                {showInvalidLogin ? <Alert variant="danger">Invalid Credentials!</Alert> : null}

                <SignInUpInput type="email" placeHolder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                <SignInUpInput type="password" placeHolder="Enter Password" value={pwd} onChange={e => setPwd(e.target.value)} />
                <SignInUpInput type="text" placeHolder="First Name" value={fname} onChange={e => setFname(e.target.value)} />
                <SignInUpInput type="text" placeHolder="Last Name" value={lname} onChange={e => setLname(e.target.value)} />

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>

                <hr />
                <Link to="/login"><span><a href="">Already have an account? Log In</a></span></Link>
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

              <SignInUpInput type="email" placeHolder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
              <SignInUpInput type="password" placeHolder="Enter Password" value={pwd} onChange={e => setPwd(e.target.value)} />
              
              <hr />
              <Link to="/signup"><span><a href="">Can't log in? Sign up for an account</a></span></Link>
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
