import './SignInUpInput.css'
import { Form } from 'react-bootstrap';




function SignInUpInput(props) {
    return (
        <div className='c-signinupinput'>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Control type={props.type} placeHolder={props.placeHolder} />
            </Form.Group>
        </div>
    );
}

export default SignInUpInput;
