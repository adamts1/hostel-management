import './EditRoom.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';



function EditRoom({show, onClose, roomNumber, maxBeds, pricePerDay, notes}) {
    const [roomNumberState, setRoomNumber] = useState(roomNumber);
    const [maxBedsState, setMaxBeds] = useState(maxBeds);
    const [pricePerDayState, setPricePerDay] = useState(pricePerDay);
    const [NotesState, setNotes] = useState(notes);
    


  return (
    <div className='c-crudhostel'>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
        <Modal.Title>Edit room Number <span>{roomNumber}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
             <SignInUpInput value={roomNumberState} type="string" placeHolder="Room number" onChange={e => setRoomNumber(e.target.value)} />
             <SignInUpInput value={maxBedsState} type="number" placeHolder="Maximum amount of beds" onChange={e => setMaxBeds(e.target.value)} />
             <SignInUpInput value={pricePerDayState} type="number" placeHolder="Price per day" onChange={e => setPricePerDay(e.target.value)} />
             <SignInUpInput value={NotesState} type="string" placeHolder="Notes" onChange={e => setNotes(e.target.value)} />
          </Form.Group>setNotes
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={onClose}> Close </Button> 
          <Button className="create" variant="primary" >Save</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default EditRoom;
