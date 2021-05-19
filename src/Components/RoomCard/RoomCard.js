import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import EditRoom from '../EditRoom/EditRoom'
import { useEffect, useState } from 'react';
import Parse from 'parse';
import './RoomCard.css'
import RoomModel from '../../Model/RoomModel'

function RoomCard({roomNumber, maxBeds, pricePerDay, notes, onDelete, roomId}) {
    const [showEditModel, setShowEditModel] = useState(false);

    async function handleUpdateRoom(roomNumber, maxBeds, pricePerDay, Notes) {
        const roomTable = Parse.Object.extend('Room');
        const query = new Parse.Query(roomTable);
        const parseRoom = await query.get(roomId);
        const RoomInstance = new RoomModel(parseRoom)
        const updateRoom = await RoomInstance.updateRoom(roomNumber, maxBeds, pricePerDay, Notes);
      }

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
                                <MdEdit  onClick={()=>setShowEditModel(true)} />
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
            <EditRoom 
                show={showEditModel}
                onClose={()=>setShowEditModel(false)}
                onUpdate={handleUpdateRoom}
                roomNumber={roomNumber}
                maxBeds={maxBeds}
                pricePerDay={pricePerDay}
                notes={notes}
                />
        </div>
    );
}

export default RoomCard;