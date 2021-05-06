import './NewHostelModel.css'
import SignInUpInput from '../../Components/SignInUpInput/SignInUpInput'
import { Modal, Button, Form } from 'react-bootstrap';



function NewHostelModel({ show, onClose }) {
  return (
    <div className='c-newhostelmodel'>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Hostel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
      
            <SignInUpInput type="text" placeHolder="Hostel Name"  />
            <SignInUpInput type="text" placeHolder="Hostel Address" />
            <SignInUpInput type="number" placeHolder="# Rooms"  />


          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default NewHostelModel;
