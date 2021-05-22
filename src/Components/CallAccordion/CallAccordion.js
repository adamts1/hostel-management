import './CallAccordion.css'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Redirect } from 'react-router-dom';
import { useState,  useEffect} from 'react';


function CallAccordion({ call, onDelete, role, onClickUpdate }) {
    const [tenant, setTenant] = useState();
    const [tenantRoom, setTenantRoom] = useState();

    useEffect(() => {
        
        setTenant(call.parseCall.attributes.tenantId.attributes.fname + " " + call.parseCall.attributes.tenantId.attributes.lname)
        setTenantRoom(call.parseCall.attributes.tenantId.attributes.room)
            

      },[])


    var mystyle = {}
    if(call.status == "Done"){ 
     mystyle = {
        backgroundColor: 'DodgerBlue',
      };
    }else{
     mystyle = {
        background: 'radial-gradient(grey, black)',
          };
    }


    
    return (
        <div className="c-callaccordion">
            <Card>
                <Card.Header style= {mystyle}>
                    <Accordion.Toggle as={Button} variant="link" eventKey={call.id}>
                        <IoIosArrowDropdown color="white" /> <span>{call.title}</span>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={call.id}>
                    <Card.Body>
                        {role == 'tenant'
                            ? <Row>
                                <Col sm={12} lg={2}>Title:<br/><span>{call.title}</span></Col>
                                <Col sm={12} lg={2}>Status:<br/><span>{call.status}</span></Col>
                                <Col sm={12} lg={2}>Description:<br/><span>{call.description}</span></Col>
                                <Col sm={12} lg={2}>Urgency Level:<br/><span>{call.urgentLevel}</span></Col>
                                <Col sm={12} lg={2}>Managment Notes:<br/><span>{call.notes}</span></Col>
                                <Col sm={12} lg={2} className="crud-icons" sm={12}>
                                    <Button variant="secondary" onClick={() => onDelete(call)} ><span>Remove</span></Button>
                                </Col>
                            </Row>
                            :
                            <div>
                                <Row>
                                    <Col sm={12} lg={2}>Tenant Name:<br/> <span>{tenant}</span></Col>
                                    <Col sm={12} lg={2}>Room Number:<br/> <span>{tenantRoom}</span></Col>
                                    <Col sm={12} lg={2}>Title:<br/><span>{call.title}</span></Col>
                                    <Col sm={12} lg={2}>Description:<br/><span>{call.description}</span></Col>
                                    <Col sm={12} lg={2}>Urgency Level:<br/><span>{call.urgentLevel}</span></Col>
                                    <Col sm={12} lg={2}> 
                                        <Button className="update-status" onClick={()=>onClickUpdate(call)} ><span>Update Status</span></Button>
                                    </Col>
                                </Row>
                           
                            </div>
                        }

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    );
}

export default CallAccordion;