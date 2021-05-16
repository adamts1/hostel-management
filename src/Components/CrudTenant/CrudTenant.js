import './CrudTenant.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form, Col, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function CrudTenant({ show, onClose, onCreate}) {
  const [tenantFName, setTenantFName] = useState();
  const [tenantLName, setTenantLName] = useState();
  const [tenantEmail, setTenantEmail] = useState();
  const [tenantUsername, setTenantUsername] = useState();
  const [tenantPassword, setTenantPassword] = useState();
  const [tenantRoom, setTenantRoom] = useState();

  const [tenantPayment, setPayment] = useState();
  const [tenantStart, setTenantStart] = useState();
  const [tenantEnd, setTenantEnd] = useState();
  const [img, setImg] = useState(null);

  function clearForm() {
    setTenantFName("");
    setTenantLName("");
    setTenantEmail("");
    setTenantUsername("");
    setTenantPassword("");
    setTenantRoom("");
    setPayment("");
    setTenantStart("");
    setTenantEnd("");
    setImg(null);
  }


  const createTenant = () => {
    onCreate(tenantFName, tenantLName ,tenantEmail, tenantUsername,tenantPassword, tenantRoom, tenantPayment, tenantStart, tenantEnd, img);
    clearForm();
    onClose();
  }

  function handleFileChange(e) {
    if (e.target.files.length === 1) {
        setImg(e.target.files[0]);
    } else {
        setImg(null);
    }
}


  return (
    <div className='c-crudtenant'>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
        <Modal.Title>Create New Tenant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <SignInUpInput value={tenantFName} type="string" placeHolder="First Name" onChange={e => setTenantFName(e.target.value)} />
            <SignInUpInput value={tenantLName} type="string" placeHolder="Last Name" onChange={e => setTenantLName(e.target.value)} />
            <SignInUpInput value={tenantEmail} type="email" placeHolder="Email" onChange={e => setTenantEmail(e.target.value)} />
            <SignInUpInput value={tenantUsername} type="string" placeHolder="Username" onChange={e => setTenantUsername(e.target.value)} />
            <SignInUpInput value={tenantPassword} type="password" placeHolder="Password" onChange={e => setTenantPassword(e.target.value)}/>
            <SignInUpInput value={tenantRoom} type="string" placeHolder="room" onChange={e => setTenantRoom(e.target.value)}/>
            <SignInUpInput value={tenantPayment} type="string" placeHolder="Payment" onChange={e => setPayment(e.target.value)}/>
            <SignInUpInput value={tenantStart} type="date" placeHolder="Start" onChange={e => setTenantStart(e.target.value)}/>
            <SignInUpInput value={tenantEnd} type="date" placeHolder="End" onChange={e => setTenantEnd(e.target.value)}/>
            <Col sm={9}>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>
            </Col>        
            <Image src={img ? URL.createObjectURL(img) : ""}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
          <Button onClick={createTenant}  className="create" variant="primary" >Create</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CrudTenant;
