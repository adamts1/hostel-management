import './CrudRoom.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function CrudRoom({ show, onClose, onCreate}) {
  const [roomNumber, setRoomNumber] = useState();
  const [maxBeds, setMaxBeds] = useState();
  const [pricePerDay, setPricePerDay] = useState();


  function clearForm() {
    setMaxBeds("");
    setPricePerDay("");
    setRoomNumber("");
  }


  const createRoom = () => {
    onCreate(roomNumber ,maxBeds, pricePerDay);
    clearForm();
    onClose();
  }


  return (
    <div className='c-crudhostel'>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
        <Modal.Title>Create New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <SignInUpInput value={roomNumber} type="string" placeHolder="Room number" onChange={e => setRoomNumber(e.target.value)} />
            <SignInUpInput value={maxBeds} type="number" placeHolder="Maximum amount of beds" onChange={e => setMaxBeds(e.target.value)} />
            <SignInUpInput value={pricePerDay} type="number" placeHolder="Price per day" onChange={e => setPricePerDay(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createRoom}>Save</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CrudRoom;
