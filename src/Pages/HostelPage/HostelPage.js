import './HostelPage.css'
import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import HostelModel from '../../Model/HostelModel'
import RoomModel from '../../Model/RoomModel'
import CrudRoom from '../../Components/CrudRoom/CrudRoom'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Parse from 'parse';
import RoomCard from '../../Components/RoomCard/RoomCard';


function HostelPage() {
  const [showCrudModel, setShowCrudModel] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hostelInstance, setHostelInstance] = useState([]);
  const { index } = useParams();


  useEffect(() => {
    async function getHostelsInstance() {
      const HostelTable = Parse.Object.extend('Hostel');
      const query = new Parse.Query(HostelTable);
      const parseHostel = await query.get(index);
      const parseHostelInstance = new HostelModel(parseHostel)
      const rooms =  await parseHostelInstance.getMyRooms();
      setHostelInstance(parseHostelInstance)
      setRooms(rooms)
    }
      getHostelsInstance();
  }, [])


  async function handleNewRoom(roomNumber, maxBeds, pricePerDay, notes) {
    const newRoom = await hostelInstance.createRoom(roomNumber, maxBeds, pricePerDay, notes);
    setRooms(rooms.concat(newRoom));
  }

  return (
    <div className='p-hostelpage'>
      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>{hostelInstance.hostelName}</h1>
          </Col>
        </Row>
        <hr />
        <div className="cards-warper">
          <Card
            bg="info"
            key="1"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2 add-card"
            onClick={() => setShowCrudModel(true)}
          >
            <Card.Body>
              <IoAddCircleOutline />
              <h5>Add New Room</h5>
            </Card.Body>
          </Card>
        
       

        {rooms.map(room =>
        <RoomCard 
          notes={room.notes}
          roomNumber={room.roomNumber}
          pricePerDay={room.pricePerDay}
          maxBeds={room.maxBed}
         
          />
        
        )}
        </div>
         <CrudRoom
          onCreate={handleNewRoom}
          onClose={() => setShowCrudModel(false)}
          show={showCrudModel}
        />
      </Container>
    </div>
  );
}
export default HostelPage;
