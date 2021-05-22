import './TenantPage.css';
import { useParams } from 'react-router';
import CreateCall from '../../Components/CreateCall/CreateCall'
import CallAccordion from '../../Components/CallAccordion/CallAccordion'
import WarningModel from '../../Components/WarningModel/WarningModel'
import CallModel from '../../Model/CallModel'
import { Container, Accordion, Card, Row, Button, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function TenantPage({ activeUser }) {
  const { index } = useParams();
  const [showCreateCall, setShowCreateCall] = useState(false);

  const [callInstance, setCallInstance] = useState();

  const [calls, setCalls] = useState([]);
  const [showWarningModel, setShowWarningModel] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const calls = await activeUser.getMyCalls();
        setCalls(calls);
      } catch {
        console.log("No Calls")
      }
    }
    if (activeUser) {
      fetchData();
    }
  }, [activeUser])

  async function handleNewCall(title, urgentLevel, description) {
    const newCall = await activeUser.createCall(title, urgentLevel, description);
    setCalls(calls.concat(newCall));
  }

  // Invoke warning model before delete
  async function handleWarningCall(call) {

    setCallInstance(call)
    setShowWarningModel(true)

  }

  async function handleDeleteCall() {
    setShowWarningModel(false)
    const removedCall = await callInstance.deleteCall();
    const remainCall = calls.filter(call => call.id != removedCall.id)
    setCalls(remainCall);
  }

  return (
    <div className="p-tenantpage">
      <div className="summary-box">
        <Row>
          <Col xs={12}>
            <Image src={activeUser["img"].url()} rounded />
          </Col>
          <Col xs={12} className="profile-content">
            <div>
              <span className='title'>Full Name: </span><span>{activeUser["fname"] + " " + activeUser["lname"]}</span>
            </div>
            <div>
              <span className='title'>Start date: </span><span>{activeUser["start"]}</span>
            </div>
            <div>
              <span className='title'>End date: </span><span>{activeUser["end"]}</span>
            </div>
            <div>
              <span className='title'>Payment: </span><span> {activeUser["payment"]}</span>
            </div>
            <div>
              <span className='title'>Open Calls: </span><span>  {calls.length}</span>
            </div>
          </Col>

        </Row>
      </div>
      <Container>
        <Row>
          <Col sm={12} lg={12}>
            <Row className="p-1 align-items-center">
              <Col>
                <h1>Hello {[activeUser["fname"] + "!"]}</h1>
              </Col>
              <Col>
                <Button id="add-new" variant="outline-secondary" type="submit" onClick={() => setShowCreateCall(true)}  >Open Call</Button>
              </Col>
            </Row>
            {calls.length != 0
              ? <Accordion defaultActiveKey="0">
                {calls.map(call =>
                  <CallAccordion
                    call={call}
                    onDelete={handleWarningCall}
                  />
                )}
              </Accordion>
              : <h2 className="no-data">No Calls...)</h2>
            }

          </Col>
        </Row>
        <CreateCall
          show={showCreateCall}
          onClose={() => setShowCreateCall(false)}
          onCreate={handleNewCall}
        />
      </Container>
      {callInstance
        ? <WarningModel
          show={showWarningModel}
          onClose={() => setShowWarningModel(false)}
          onDelete={handleDeleteCall}
          actionOnInstanse="Call of:  "
          instanseName={callInstance.title}
        />
        : null
      }
    </div>
  );
}

export default TenantPage;