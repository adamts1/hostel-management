import './HostelPage.css'
import NewHostelModel from '../../Components/NewHostelModel/NewHostelModel'
import HostelAccordion from '../../Components/HostelAccordion/HostelAccordion'
import { Container, Accordion, Card, Row, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Parse from 'parse';


function AdminMainPage({ activeUser }) {
  const [showNewHostelModel, setShowNewHostelModel] = useState(false);
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const hostels = await activeUser.getMyHostel();
      setHostels(hostels);
    }

    if (activeUser) {
      fetchData();
    }
  }, [activeUser])



  async function handleNewHostel(name, address, numOfRooms) {
    const newHostel = await activeUser.createHostel(name, address, numOfRooms);
    setHostels(hostels.concat(newHostel));
  }

  async function handleDeleteHostel() {
    const removedHostel = await activeUser.deleteHostel();
  }



  return (
    <div className='p-hostelpage'>
      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>Hostels</h1>
          </Col>
          <Col>
            <Button id="add-new" variant="outline-secondary" type="submit" onClick={() => setShowNewHostelModel(true)} >Add New Hostel</Button>
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
                onDelete={handleDeleteHostel} />
            )}
          </Accordion>
          : <h1>No Hostels Yet..</h1>
        }


        <NewHostelModel onCreate={handleNewHostel} show={showNewHostelModel} onClose={() => setShowNewHostelModel(false)} />
      </Container>
    </div>
  );
}

export default AdminMainPage;


