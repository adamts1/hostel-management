import './CrudTenant.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form, Col, Image, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import RoomDropDown from '../RoomDropDown/RoomDropDown'


function CrudTenant({ show, onClose, onCreate, rooms }) {
  const [tenantFName, setTenantFName] = useState();
  const [tenantLName, setTenantLName] = useState();
  const [tenantEmail, setTenantEmail] = useState();
  const [tenantUsername, setTenantUsername] = useState();
  const [tenantPassword, setTenantPassword] = useState();
  const [tenantRoom, setTenantRoom] = useState();
  const [tenantRoomKey, setTenantRoomKey] = useState();
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
    onCreate(tenantFName, tenantLName, tenantEmail, tenantUsername, tenantPassword, tenantRoom, tenantRoomKey, tenantPayment, tenantStart, tenantEnd, img);
    clearForm();
    onClose();
  }

  // Set room (for view) and room key (for reference) as a string in different column in parse db 
  const handleRoom = (value, key) => {
    setTenantRoom(value)
    setTenantRoomKey(key)

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
            <SignInUpInput value={tenantPassword} type="password" placeHolder="Password" onChange={e => setTenantPassword(e.target.value)} />
            <RoomDropDown rooms={rooms} value={tenantRoom} onClick={(value, key) => handleRoom(value, key)} />
            <SignInUpInput value={tenantPayment} type="string" placeHolder="Payment" onChange={e => setPayment(e.target.value)} />
            <SignInUpInput value={tenantStart} type="date" placeHolder="Start" onChange={e => setTenantStart(e.target.value)} />
            <SignInUpInput value={tenantEnd} type="date" placeHolder="End" onChange={e => setTenantEnd(e.target.value)} />
            <div className="file-input-warper">
              <label for="file-input">
                <img src={'/img/upload.gif'} />
                <p>Upload profile picture</p>
              </label>
            </div>
            <Form.Control id="file-input" type="file" accept="image/*" onChange={handleFileChange} src={'/img/upload.png'} />


            <Image src={img ? URL.createObjectURL(img) : ""} />

          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
          <Button onClick={createTenant} className="create" variant="primary" >Create</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CrudTenant;
