import './CrudHostel.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function CrudHostel({ show, onClose, onCreate, onUpdate, hostelName, hostelAddress, nunOfRooms, action }) {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [nuberOfRooms, setNuberOfRooms] = useState();

  // useEffect(() => {
  //   if( action === 'edit'){
  //     setName(hostelName)
  //     setAddress(hostelAddress)
  //     setNuberOfRooms(nunOfRooms)
  //   }else{
  //     setName()
  //     setAddress()
  //     setNuberOfRooms()
  //   }
  // });

  const updateOrDelete = action;

  function clearForm() {
    setName("");
    setAddress("");
    setNuberOfRooms("");
  }


  const createHostel = () => {
    onCreate(name, address, nuberOfRooms);
    clearForm();
    onClose();
  }

  const updateHostel = () => {
    onUpdate(name, address, nuberOfRooms);
    clearForm();
    onClose();

  } 

  return (
    <div className='c-crudhostel'>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          
          {updateOrDelete === 'create'
        ? <Modal.Title>Create New Hostel</Modal.Title>
        : <Modal.Title>Update  {name}</Modal.Title>
      }
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <SignInUpInput value={name} type="text" placeHolder="Hostel Name" onChange={e => setName(e.target.value)} />
            <SignInUpInput value={address} type="text" placeHolder="Hostel Address" onChange={e => setAddress(e.target.value)} />
            <SignInUpInput value={nuberOfRooms} type="text" placeHolder="# Rooms" onChange={e => setNuberOfRooms(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {updateOrDelete === 'create'
        ? <Button variant="primary" onClick={createHostel}>Save Changes</Button>
        : <Button variant="primary" onClick={updateHostel}>Update</Button>
      }
          
          
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CrudHostel;
