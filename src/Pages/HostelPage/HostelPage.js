import './HostelPage.css'
import { Container, Row, Tabs, Col, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RoomSection from '../../Components/RoomSection/RoomSection'
import TenantsSection from '../../Components/TenantsSection/TenantsSection'
import Parse from 'parse';
import HostelModel from '../../Model/HostelModel'
import { useParams } from 'react-router';

function HostelPage({ activeUser }) {

  const [hostelInstance, setHostelInstance] = useState([]);
  const { index } = useParams();

  useEffect(() => {
    async function getHostelsInstance() {
      const hostelTable = Parse.Object.extend('Hostel');
      const query = new Parse.Query(hostelTable);
      const parseHostel = await query.get(index);
      const parseHostelInstance = new HostelModel(parseHostel)
      setHostelInstance(parseHostelInstance)
     
    }
    getHostelsInstance();
  }, [])
 
  const [tabKey, setTabKey] = useState('rooms')

  return (
    <div className='p-hostelpage'>

      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            {/* <h1>{hostelInstance.hostelName}</h1> */}
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
        <hr />
        {tabKey === 'rooms' &&
          <RoomSection activeUser={activeUser}/>
        }
        {tabKey === 'tenents' &&
          <TenantsSection activeUser={activeUser}/>
        }
        {tabKey === 'calls' &&
          <div>calls</div>
        }
      </Container>
    </div>
  );
}
export default HostelPage;
