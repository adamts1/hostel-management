import './UpdateCall.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';


function UpdateCall({ show, onClose, onUpdate }) {
    const [notes, setNotes] = useState();
    const [status, setStatus] = useState();


    const clearForm =() => {
        setStatus("")
        setNotes("");
    }

    const updateCall = () => {
        onUpdate(notes, status);
        clearForm();
        onClose();
    }

    const closeCall = () => {
        clearForm();
        onClose();
    }

    const handleChange =(e) => {
        setStatus(e.target.value)
    }

    return (
        <div className='c-updatecall'>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Call</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <div className="radio-warper">
                            <input type="radio" value="notDone" name="call"  onChange={handleChange}/> In Process
                            <input type="radio" value="Done" name="call" onChange={handleChange} /> Done
                        </div>
                    </Form.Group>
                    <SignInUpInput value={notes} type="string" placeHolder="Notes" onChange={e => setNotes(e.target.value)} /> 

                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={closeCall}>close</Button>
                    <Button onClick={updateCall} className="create" variant="primary" >Update</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default UpdateCall;
