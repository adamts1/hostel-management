import './CreateCall.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function CreateCall({ show, onClose, onCreate}) {
  const [title, setTitle] = useState();
  const [description, setDescriptions] = useState();
  const [urgenLevel, setUrgenLevel] = useState();


  function clearForm() {
    setTitle("");
    setDescriptions("");
    setUrgenLevel("");
  }

  const createRoom = () => {
    onCreate(title, urgenLevel ,description);
    clearForm();
    onClose();
  }


  return (
    <div className='c-crudhostel'>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
        <Modal.Title>Create New Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <SignInUpInput value={title} type="string" placeHolder="Title" onChange={e => setTitle(e.target.value)} />
            <SignInUpInput value={urgenLevel} type="string" placeHolder="urgenLevel" onChange={e => setUrgenLevel(e.target.value)} />
            <textarea  value={description} type="string" placeHolder="Description" onChange={e => setDescriptions(e.target.value)}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={onClose}> Close </Button>
          <Button className="create" variant="primary" onClick={createRoom}> Save </Button> 
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CreateCall;