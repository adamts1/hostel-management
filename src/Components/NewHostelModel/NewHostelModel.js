import './NewHostelModel.css'
import SignInUpInput from '../../Components/SignInUpInput/SignInUpInput'
import { Modal, Button, Form } from 'react-bootstrap';
import Parse from 'parse';
import { useState } from 'react';





function NewHostelModel({ show, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nuberOfRooms, setNuberOfRooms] = useState("");

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

  return (
    <div className='c-newhostelmodel'>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Hostel</Modal.Title>
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
          <Button variant="primary" onClick={createHostel}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default NewHostelModel;
