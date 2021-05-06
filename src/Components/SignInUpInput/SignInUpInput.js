import './SignInUpInput.css'
import { Form } from 'react-bootstrap';


function SignInUpInput({type, placeHolder, onChange}) {
    return (
        <div className=''>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Control type={type} placeholder={placeHolder} onChange={onChange} />
            </Form.Group>
        </div>
    );
}

export default SignInUpInput;
