import './SignInUpInput.css'
import { Form } from 'react-bootstrap';


function SignInUpInput({type, placeHolder, onChange, value}) {
    return (
        <div className=''>
            
            <Form.Group controlId="formBasicCheckbox">
                {type === 'date' &&
                <Form.Label>{placeHolder}</Form.Label>
                }   
                <Form.Control value={value}  type={type} placeholder={placeHolder} onChange={onChange} />
            </Form.Group>
        </div>
    );
}

export default SignInUpInput;
