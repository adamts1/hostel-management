import './HostelPage.css'
import { Container, Row, Tabs, Col, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RoomSection from '../../Components/RoomSection/RoomSection'
import TenantsSection from '../../Components/TenantsSection/TenantsSection'
import CallsSection from '../../Components/CallsSection/CallsSection'
import Parse from 'parse';
import HostelModel from '../../Model/HostelModel'
import { useParams } from 'react-router';

function HostelPage({ activeUser }) {

  const [hostelInstance, setHostelInstance] = useState([]);
  const [tabKey, setTabKey] = useState('rooms')
  const [rooms, setRooms] = useState([]);
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


  return (
    <div className='p-hostelpage'>
      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            <h1><a href='https://adamts1.github.io/hostel-management/#/hostelspage'>{hostelInstance.hostelName} </a></h1>
          </Col>
        </Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={tabKey}
          onSelect={(k) => setTabKey(k)}>
          <Tab eventKey="rooms" title="Rooms">
          </Tab>
          <Tab eventKey="tenants" title="Tenants">
          </Tab>
          <Tab eventKey="calls" title="Calls" >
          </Tab>
        </Tabs>
        <hr />
        {tabKey === 'rooms' &&
          <RoomSection activeUser={activeUser}  />
        }
        {tabKey === 'tenants' &&
          <TenantsSection activeUser={activeUser} />
        }
        {tabKey === 'calls' &&
          <CallsSection activeUser={activeUser}/>
        }
      </Container>
    </div>
  );
}
export default HostelPage;
