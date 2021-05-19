import './WarningModel.css'
import SignInUpInput from '../../Components/SignInUpInput/SignInUpInput'
import { Modal, Button } from 'react-bootstrap';
import Parse from 'parse';
import { useState } from 'react';



function WarningModel({ show, onClose, instanseName, actionOnInstanse, onDelete }) {

  

    return (
        <div className='c-warningmodel'>

            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove {actionOnInstanse} {instanseName} ?</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Delete {hostelName} ?</Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default WarningModel;
