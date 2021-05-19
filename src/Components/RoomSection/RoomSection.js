import './RoomSection.css'
import RoomCard from '../RoomCard/RoomCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import WarningModel from '../../Components/WarningModel/WarningModel'
import { useState, useEffect } from 'react';
import Parse from 'parse';
import HostelModel from '../../Model/HostelModel'
import RoomModel from '../../Model/RoomModel'
import CreateRoom from '../CreateRoom/CreateRoom'
import { useParams } from 'react-router';
import EditRoom from '../EditRoom/EditRoom'



function RoomSection({ activeUser }) {
  const [hostelInstance, setHostelInstance] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [showCrudModel, setShowCrudModel] = useState(false);
  const [showWarningModel, setShowWarningModel] = useState();
  const [showEditModel, setShowEditModel] = useState(false);
  const [roomInstance, setRoomInstance] = useState();

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

  function handleWarningRoom(room) {
    setShowWarningModel(true)
    setRoomInstance(room)
  }

  async function handleDeleteRoom() {
    setShowWarningModel(false)
    const removedRoom = await roomInstance.deleteRoom();
    const remainRooms = rooms.filter(room => room.id != removedRoom.id)
    setRooms(remainRooms);
  }

  function showEditClick(room){
    setShowEditModel(true)
    setRoomInstance(room)
  }

  
  async function handleUpdateRoom(roomNumber,maxBeds, pricePerDay, notes) {
    await roomInstance.updateRoom(roomNumber, maxBeds, pricePerDay, notes);
    const rooms = await hostelInstance.getMyRooms();
    setRooms(rooms)
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
            room={room}
            onDelete={handleWarningRoom}
            editClick={showEditClick}
            activeUser={activeUser}
          />
        )}

      </div>
      <CreateRoom
        onCreate={handleNewRoom}
        onClose={() => setShowCrudModel(false)}
        show={showCrudModel}
        
      />
        {roomInstance
        ? <EditRoom
        show={showEditModel}
        onClose={() => setShowEditModel(false)}
        onUpdate={handleUpdateRoom}
        room={roomInstance} 
        activeUser={activeUser} 
      />
        : null
      }
      {roomInstance
        ? <WarningModel
        show={showWarningModel}
        onClose={() => setShowWarningModel(false)}
        onDelete={handleDeleteRoom}
        actionOnInstanse="Room number:  "
        instanseName={roomInstance.roomNumber}
      />  
        : null
      }
      
    </div>
  );
}
export default RoomSection;
