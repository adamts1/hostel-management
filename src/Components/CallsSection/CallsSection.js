import './CallsSection.css'
import CallAccordion from '../CallAccordion/CallAccordion'
import { Container, Accordion, Card, Row, Button, Col, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';


function CallsSection({ activeUser }) {
    const [calls, setCalls] = useState([]);
    const { index } = useParams();

    console.log(calls)
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
    
      


    return (
        <div className='c-callssection'>
            {calls.length != 0
              ? <Accordion defaultActiveKey="0">
                {calls.map(call =>
                  <CallAccordion
                    call={call}
                    // onDelete={handleWarningCall}
                  />
                )}
              </Accordion>
              : <h2 className="no-data">No Calls...)</h2>
            }
      
        </div>
    );
}
export default CallsSection;
