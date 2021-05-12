import { Card, Container, Row, Button, Col } from 'react-bootstrap';

import './RoomCard.css'

function RoomCard() {
    const [redirectTo, setRedirectTo] = useState();

    if (redirectTo !== undefined) {
        return <Redirect to={'/hostel/' + redirectTo} />
    }

    return (
        <div className="c-roomcard">
            <Card
                bg="info"
                key="2"
                text='white'
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>Room Number <span> 30</span></Card.Title>
                    <hr />
                    <Card.Text>
                        <div><span className="font-weight-bold">Calls: </span><span>0</span></div>
                        <div><span className="font-weight-bold">Tenants: </span><span>5</span></div>
                        <hr />
                        <p><span className="font-weight-bold">Notes: </span><span>Lorem ipsum sssss</span></p>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default RoomCard;