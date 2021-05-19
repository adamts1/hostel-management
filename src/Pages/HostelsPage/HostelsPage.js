import './HostelsPage.css'
import CrudHostel from '../../Components/CrudHostel/CrudHostel'
import WarningModel from '../../Components/WarningModel/WarningModel'
import HostelModel from '../../Model/HostelModel'
import HostelAccordion from '../../Components/HostelAccordion/HostelAccordion'
import { Container, Accordion, Card, Row, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Parse from 'parse';


function HostelsPage({ activeUser }) {
  const [showCrudModel, setShowCrudModel] = useState(false);
  const [showWarningModel, setShowWarningModel] = useState(false);
  const [hostelName, setHostelName] = useState();
  const [hostelId, setHostelId] = useState();
  const [hostels, setHostels] = useState([]);
  const [hostelsInstanse, seThostelsInstanse] = useState([]);
  
  // Define if create or edit hostel
  const [action, setAction] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try{
        const hostels = await activeUser.getMyHostel();
        setHostels(hostels);
      }catch{
        console.log("No Hostels")
      }
    }
    if (activeUser) {
      fetchData();
    }
  }, [activeUser])

  async function handleNewHostel(name, address, numOfRooms) {
    const newHostel = await activeUser.createHostel(name, address, numOfRooms);
    setHostels(hostels.concat(newHostel));
  }

  async function handleUpdateHostel(name, address, numOfRooms) {
    await HostelModel.updateHostel(name, address, numOfRooms, hostelId);
    const hostels = await activeUser.getMyHostel();
    setHostels(hostels);
  }

  async function handleDeleteHostel() {
    setShowWarningModel(false)
    const HostelTable = Parse.Object.extend('Hostel');
    const query = new Parse.Query(HostelTable);
    const parseHostel = await query.get(hostelId);
    const parseHostelInstance = new HostelModel(parseHostel)
    const removedHostel = await parseHostelInstance.deleteHostel();
    const remainHostels = hostels.filter(hostel => hostel.id != removedHostel.id)
    setHostels(remainHostels);
  }

  // Invoke warning model before delete
  async function handleWarningHostel(hostelName, hostelId) {
    setShowWarningModel(true)
    setHostelName(hostelName)
    setHostelId(hostelId)
  }

  // Invoke create hostel model
  async function setCreateHostelModel() {
    setAction('create')
    setShowCrudModel(true)
  }

  // Invoke edit hostel model
  function setEditHostelModel(hostelId) {
    setAction('edit')
    setShowCrudModel(true)

    setHostelId(hostelId)
  }

  return (
    <div className='p-hostelspage'>
      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>Hostels</h1>
          </Col>
          <Col>
            <Button id="add-new" variant="outline-secondary" type="submit" onClick={setCreateHostelModel} >Add New Hostel</Button>
          </Col>
        </Row>
        <hr />
        {hostels.length != 0
          ? <Accordion defaultActiveKey="0">
            {hostels.map(hostel =>
              <HostelAccordion
                key={hostel.id}
                hostelKey={hostel.id}
                hostelAddress={hostel.hostelAddress}
                hostelName={hostel.hostelName}
                numberOfRooms={hostel.numberOfRooms}
                //click on edit icon
                onEdit={setEditHostelModel}
                onDelete={handleWarningHostel} />
            )}
          </Accordion>
          : <h1>No Hostels Yet..</h1>
        }
        <CrudHostel
          onCreate={handleNewHostel}
          onUpdate={handleUpdateHostel}
          show={showCrudModel}
          onClose={() => setShowCrudModel(false)}
          hostelName={hostelName}
          // hostelAddress={hostelAddress}
          action={action}
        />
        <WarningModel
          show={showWarningModel}
          onClose={() => setShowWarningModel(false)}
          onDelete={handleDeleteHostel}
          hostelName={hostelName}
        />
      </Container>
    </div>
  );
}

export default HostelsPage;