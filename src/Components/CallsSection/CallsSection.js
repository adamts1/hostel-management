import './CallsSection.css'
import CallAccordion from '../CallAccordion/CallAccordion'
import UpdateCall from '../../Components/UpdateCall/UpdateCall'
import { Container, Accordion, Card, Row, Button, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';


function CallsSection({ activeUser }) {
    const [ calls, setCalls] = useState([]);
    const [ callInstance, setCallInstance] = useState([]);
    const [ showUpdateCall ,setShowUpdateCall] = useState(false);
    const { index } = useParams();

    useEffect(() => {
        async function fetchCalls() {
          try {
            const calls = await activeUser.getHostelCalls(index);
            setCalls(calls)
          } catch {
            console.log("No Calss")
          }
        }
        if (activeUser) {
            fetchCalls();
        }
      },[])

      async function handleUpdateCall(notes, status) {
        const removedRoom = await callInstance.updateCall(notes, status);
        const calls = await activeUser.getHostelCalls(index)
        setCalls(calls)
      }

      function handleKlickUpdateCall(callInsatance) {
        setShowUpdateCall(true)
        setCallInstance(callInsatance)
    }
      
    return (
        <div className='c-callssection'>
            {calls.length != 0
              ? <Accordion defaultActiveKey="0">
                {calls.map(call =>
                  <CallAccordion
                    call={call}
                    role={"admin"}
                    onClickUpdate = {handleKlickUpdateCall}
                  />
                )}
              </Accordion>
              : <h2 className="no-data">No Calls...)</h2>
            }
        <UpdateCall
          show = {showUpdateCall}
          onClose = {()=>setShowUpdateCall(false)}
          onUpdate = {handleUpdateCall}
        />
        </div>
    );
}
export default CallsSection;
