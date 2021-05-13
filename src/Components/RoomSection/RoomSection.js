import './RoomSection.css'
import RoomCard from '../RoomCard/RoomCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';




function RoomSection({onClick, onDelete, rooms}) {
  return (
    <div className='c-roomsection'>
        <div className="cards-warper">
          <Card
            bg="info"
            key="1"
            text='white'
            style={{ width: '15rem' }}
            className="mb-2 add-card"
            onClick={onClick}
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
              onDelete={onDelete}
            />
          )}
        </div>
    </div>
  );
}
export default RoomSection;
