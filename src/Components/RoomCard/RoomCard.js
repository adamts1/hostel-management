import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Parse from 'parse';
import { useParams } from 'react-router';

import './RoomCard.css'
import RoomModel from '../../Model/RoomModel'
import { X } from 'react-bootstrap-icons';

// function RoomCard({roomNumber, maxBeds, pricePerDay, notes, onDelete, roomId, editClick}) {
    function RoomCard({room, editClick, onDelete, activeUser}) {

        const [tenants, setTenant] = useState([])
        const [tenantsString, setTenantsString] = useState([])
        const { index } = useParams();


        useEffect(() => {
            async function fetchTenants() {
              try {
                const tenants = await activeUser.getRoomTenants(room.id);
                setTenant(tenants)
                setTenantsString(tenants.map(tenants => tenants.fname+", "))

              } catch {
                console.log("No Tenants")
              }
            }
            if (activeUser) {
              fetchTenants();
            }
          }, [])

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
                    <Card.Title>Room Number <span> {room.roomNumber}</span></Card.Title>
                    <hr />
                    <Card.Text className="content">
                        <div><span className="font-weight-bold">Calls: </span><span>0</span></div>
                        <div><span className="font-weight-bold">Max Beds: </span><span>{room.maxBed}</span></div>
                        <div><span className="font-weight-bold">Price per Day: </span><span>{room.pricePerDay}</span></div>
                        <div><span className="font-weight-bold">Tenants: </span><span></span>{tenantsString}</div>
                        <p><span className="font-weight-bold">Notes: </span><span>{room.notes}</span></p>
                    </Card.Text>
                    <Card.Text>
                    <div className="card-icon-wrper">
                    <hr />
                        <Row>
                        <Col xs={4} className="crud-icons">
                                <MdEdit  onClick={()=>editClick(room)} />
                        </Col>
                        <Col xs={4} className="crud-icons">   
                                <MdDelete onClick={()=>onDelete(room)}/>
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