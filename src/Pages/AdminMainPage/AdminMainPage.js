import './AdminMainPage.css'
import NewHostelModel from '../../Components/NewHostelModel/NewHostelModel'
import { Container, Accordion, Card, Row, Button, Col } from 'react-bootstrap';
import { BsPlusCircle } from 'react-icons/bs';
import { useState } from 'react';


function AdminMainPage({activeUser}) {
const [showNewHostelModel, setShowNewHostelModel] = useState(false);
const [hostels, setHostels] = useState([]);



async function handleNewHostel(name, address, numOfRooms) {
  const newHostel = await activeUser.createHostel(name, address, numOfRooms);
  console.log(newHostel)
  setHostels(hostels.concat(newHostel));
}

  return (
    <div className='p-adminmainpage'>
      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>Hostels</h1>
          </Col>
          <Col>
           <Button id="add-new" variant="outline-secondary" type="submit" onClick={()=>setShowNewHostelModel(true)} >Add New Hostel</Button>
          </Col>
        </Row>
        <hr />
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <NewHostelModel onCreate={handleNewHostel} show={showNewHostelModel} onClose={() => setShowNewHostelModel(false)}/>
      </Container>
    </div>
  );
}

export default AdminMainPage;
