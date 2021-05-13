import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import './RoomCard.css'

function RoomCard({roomNumber, maxBeds, pricePerDay, notes, onDelete, roomId}) {
    
    return (
        <div className="c-roomcard">
            <Card
                bg="info"
                key="2"
                text='white'
                style={{ width: '15rem' }}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>Room Number <span> {roomNumber}</span></Card.Title>
                    <hr />
                    <Card.Text>
                        <div><span className="font-weight-bold">Calls: </span><span>0</span></div>
                        <div><span className="font-weight-bold">Max Beds: </span><span>{maxBeds}</span></div>
                        <div><span className="font-weight-bold">Price per Day: </span><span>{pricePerDay}</span></div>
                        <div><span className="font-weight-bold">Tenants: </span><span>{notes}</span></div>
                        <p><span className="font-weight-bold">Notes: </span><span>{notes}</span></p>
                        <hr />
                        <div className="card-icon-wrper">
                        <Row>
                        <Col xs={4} className="crud-icons">
                                <MdEdit/>
                        </Col>
                        <Col xs={4} className="crud-icons">   
                                <MdDelete onClick={()=>onDelete(roomId ,roomNumber, maxBeds, pricePerDay, notes)}/>
                        </Col>        
                        <Col xs={4} className="crud-icons">       
                                <AiOutlineFolderView />
                        </Col>
                        </Row>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default RoomCard;