import './HostelPage.css'
import { Card, Container, Row, Tabs, Col, Tab} from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import HostelModel from '../../Model/HostelModel'
import RoomModel from '../../Model/RoomModel'
import CrudRoom from '../../Components/CrudRoom/CrudRoom'
import WarningModel from '../../Components/WarningModel/WarningModel'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Parse from 'parse';
import RoomCard from '../../Components/RoomCard/RoomCard';


function HostelPage() {
  const [showCrudModel, setShowCrudModel] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hostelInstance, setHostelInstance] = useState([]);
  const [showWarningModel, setShowWarningModel] = useState();
  const [notes, setNotes] = useState();
  const [maxBeds, seTmaxBeds] = useState();
  const [pricePerDay, setPricePerDay] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [roomId, setRoomId] = useState();
  const { index } = useParams();
  const [tabKey, setTabKey] = useState('rooms')


  useEffect(() => {
    async function getHostelsInstance() {
      const HostelTable = Parse.Object.extend('Hostel');
      const query = new Parse.Query(HostelTable);
      const parseHostel = await query.get(index);
      const parseHostelInstance = new HostelModel(parseHostel)
      const rooms = await parseHostelInstance.getMyRooms();
      setHostelInstance(parseHostelInstance)
      setRooms(rooms)
    }
    getHostelsInstance();
  }, [])


  async function handleNewRoom(roomNumber, maxBeds, pricePerDay, notes) {
    const newRoom = await hostelInstance.createRoom(roomNumber, maxBeds, pricePerDay, notes);
    setRooms(rooms.concat(newRoom));
  }

  function handleWarningRoom(roomId, roomNumber, maxBeds, pricePerDay, notes) {
    setShowWarningModel(true)
    seTmaxBeds(maxBeds)
    setNotes(notes)
    setPricePerDay(pricePerDay)
    setRoomNumber(roomNumber)
    setRoomId(roomId)
  }


  async function handleDeleteRoom() {
    setShowWarningModel(false)

    const RoomTable = Parse.Object.extend('Room');
    const query = new Parse.Query(RoomTable);
    const parseRoom = await query.get(roomId);
    const parseRoomInstance = new RoomModel(parseRoom)

    const removedRoom = await parseRoomInstance.deleteRoom();
    const remainRooms = rooms.filter(room => room.id != removedRoom.id)
    setRooms(remainRooms);
  }

  return (
    <div className='p-hostelpage'>

      <Container>
      <Row className="p-1 align-items-center">
          <Col>
            <h1>{hostelInstance.hostelName}</h1>
          </Col>
        </Row> 
      <Tabs 
        id="controlled-tab-example"
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}>
        <Tab eventKey="rooms" title="Rooms">
        </Tab>
        <Tab eventKey="tenents" title="Tenents">
        </Tab>
        <Tab eventKey="calls" title="Calls" >
        </Tab>
      </Tabs>
      <hr/>
        {tabKey === 'rooms' &&
          <div className="cards-warper">
          <Card
            bg="info"
            key="1"
            text='white'
            style={{ width: '15rem' }}
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
              key={room.id}
              roomId={room.id}
              notes={room.notes}
              roomNumber={room.roomNumber}
              pricePerDay={room.pricePerDay}
              maxBeds={room.maxBed}
              onDelete={handleWarningRoom}

            />

          )}
          
          
        </div>
      }
      {tabKey === 'tenents' &&
          
          
          
        <div>tenents</div>
      }
      {tabKey === 'calls' &&
          
          
          
          <div>calls</div>
        }
        
        <CrudRoom
          onCreate={handleNewRoom}
          onClose={() => setShowCrudModel(false)}
          show={showCrudModel}
        />
        <WarningModel
          show={showWarningModel}
          onClose={() => setShowWarningModel(false)}
          onDelete={handleDeleteRoom}
          actionOnInstanse="Room number-"
          instanseName={roomNumber}
        />
      </Container>
    </div>
  );
}
export default HostelPage;
