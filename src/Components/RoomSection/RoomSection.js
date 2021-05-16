import './RoomSection.css'
import RoomCard from '../RoomCard/RoomCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import WarningModel from '../../Components/WarningModel/WarningModel'
import { useState, useEffect } from 'react';
import Parse from 'parse';
import HostelModel from '../../Model/HostelModel'
import RoomModel from '../../Model/RoomModel'
import CrudRoom from '../../Components/CrudRoom/CrudRoom'
import { useParams } from 'react-router';


function RoomSection({ onClick, onDelete }) {
  const [hostelInstance, setHostelInstance] = useState([]);
  const [showCrudModel, setShowCrudModel] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [showWarningModel, setShowWarningModel] = useState();
  const [notes, setNotes] = useState();
  const [maxBeds, seTmaxBeds] = useState();
  const [pricePerDay, setPricePerDay] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [roomId, setRoomId] = useState();

  const { index } = useParams();

  useEffect(() => {
    async function getHostelsInstance() {
      const hostelTable = Parse.Object.extend('Hostel');
      const query = new Parse.Query(hostelTable);
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
    <div className='c-roomsection'>
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
            <h5>New Room</h5>
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
    </div>
  );
}
export default RoomSection;
