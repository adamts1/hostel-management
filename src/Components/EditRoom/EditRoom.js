import './EditRoom.css'
import SignInUpInput from '../SignInUpInput/SignInUpInput'
import { Modal, Button, Form, Table, ToggleButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


// function EditRoom({show, onClose, roomNumber, maxBeds, pricePerDay, notes, onUpdate}) {
function EditRoom({ show, onClose, onUpdate, room, activeUser }) {
  const [roomNumberState, setRoomNumber] = useState("");
  const [maxBedsState, setMaxBeds] = useState("");
  const [pricePerDayState, setPricePerDay] = useState("");
  const [notesState, setNotes] = useState("");
  const [tenants, setTenants] = useState([])
  const [allTenants, setAllTenants] = useState([])
  const [availebleTenants, setAvailebleTenants] = useState([])
  const [showAddTenant, setShowAddTenant] = useState(false)
  const { index } = useParams();

  useEffect(() => {
    try {
      setRoomNumber(room.roomNumber)
      setMaxBeds(room.maxBed)
      setPricePerDay(room.pricePerDay)
      setNotes(room.notes)

    } catch {
      console.log("No Tenant")
    }
  }, [room.id])

  // Get All Tenants referaned by room for edit room Model
  useEffect(() => {
    async function fetchTenants() {
      try {
        // Get all tenant related to current room 
        const tenants = await activeUser.getRoomTenants(room.id);
        setTenants(tenants)
        // Get all tenants 
        const allTenants = await activeUser.getMyTenants(index);
        // Reduice related tenant from all to get the availeble tenant 
        const availebleTenants = allTenants.filter((elem) => !tenants.find(({ id }) => elem.id === id));
        setAvailebleTenants(availebleTenants)

      } catch {
        console.log("No Tenants")
      }
    }
    if (activeUser) {
      fetchTenants();
    }
  }, [room.id])

  function clearForm() {
    setRoomNumber("");
    setMaxBeds("");
    setPricePerDay("");
    setNotes("");
  }


  const updateRoom = () => {
    onUpdate(roomNumberState, maxBedsState, pricePerDayState, notesState, tenants);
    clearForm();
    onClose();
  }


  const handleUpdateRoomClose = () => {
    onClose();
    async function fetchTenants() {
      const tenants = await activeUser.getRoomTenants(room.id);
      setShowAddTenant(false)
      setTenants(tenants)
      const allTenants = await activeUser.getMyTenants(index);
      // Reduice related tenant from all to get the availeble tenant 
      const availebleTenants = allTenants.filter((elem) => !tenants.find(({ id }) => elem.id === id));
      setAvailebleTenants(availebleTenants)
    }
    fetchTenants()
  }

  const handleRemoveTenant = (curentTenant) => {
    const result = tenants.filter(tenant => tenant.id != curentTenant.id);
    setTenants(result)
    setAvailebleTenants(availebleTenants.concat(curentTenant));
  }

  
  const handleAddTenant = (curentTenant) => {
    const result = availebleTenants.filter(tenant => tenant.id != curentTenant.id);
    setTenants(tenants.concat(curentTenant))
    setAvailebleTenants(result)
    
  }

  return (
    <div className='c-crudhostel'>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit room Number <span>{roomNumberState}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <SignInUpInput value={roomNumberState} type="string" placeHolder="Room number" onChange={e => setRoomNumber(e.target.value)} />
            <SignInUpInput value={maxBedsState} type="number" placeHolder="Maximum amount of beds" onChange={e => setMaxBeds(e.target.value)} />
            <SignInUpInput value={pricePerDayState} type="number" placeHolder="Price per day" onChange={e => setPricePerDay(e.target.value)} />
            <SignInUpInput value={notesState} type="string" placeHolder="Notes" onChange={e => setNotes(e.target.value)} />
            <h5>Tenants:</h5>
            <Table hover className="tenant-table" >
              <tbody>
                {tenants.map(tenant =>
                  <tr key={tenant.id}>
                    <td id={tenant.id}>{tenant.fname + " " + tenant.lname}   </td>
                    <td><Button variant="outline-secondary" onClick={() => handleRemoveTenant(tenant)}> Remove </Button></td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div>
              {showAddTenant  
              ?<Button className="add-tenant" variant="outline-info" onClick={() => { setShowAddTenant(!showAddTenant) }} >Close Availeble Tenants </Button>
              :<Button className="add-tenant" variant="outline-success" onClick={() => { setShowAddTenant(!showAddTenant) }} >Open Availeble Tenants </Button>
              }
            </div>
            {showAddTenant
              ? <Table hover className="tenant-table" >
                <tbody>
                  {availebleTenants.map(tenant =>
                    <tr key={tenant.id}>
                      <td id={tenant.id}>{tenant.fname + " " + tenant.lname}   </td>
                      <td>  <Button variant="outline-success" onClick={() => handleAddTenant(tenant)}> Add </Button></td>
                    </tr>
                  )}
                </tbody>
              </Table>
              : null
            }

          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleUpdateRoomClose}> Close </Button>
          <Button className="Edit" variant="primary" onClick={updateRoom} > Edit </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditRoom;
