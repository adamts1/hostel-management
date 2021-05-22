import './CallAccordion.css'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';


function CallAccordion({ call, onDelete, role, onClickUpdate }) {
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
                                <Col sm={12} lg={2}>Title: <span>{call.title}</span></Col>
                                <Col sm={12} lg={2}>Status: <span>{call.status}</span></Col>
                                <Col sm={12} lg={2}>Description: <span>{call.description}</span></Col>
                                <Col sm={12} lg={2}>Urgency Level: <span>{call.urgentLevel}</span></Col>
                                <Col sm={12} lg={2}>Managment Notes: <span>{call.notes}</span></Col>
                                <Col sm={12} lg={2} className="crud-icons" sm={12}>
                                    <Button variant="secondary" onClick={() => onDelete(call)} ><span>Remove Call</span></Button>
                                </Col>
                            </Row>
                            :
                            <div>
                                <Row>
                                    <Col sm={12} lg={2}>Tenant Name: <span>Adam Tsityat</span></Col>
                                    <Col sm={12} lg={2}>Room Number: <span>15</span></Col>
                                    <Col sm={12} lg={2}>Title: <span>{call.title}</span></Col>
                                    <Col sm={12} lg={2}>Description: <span>{call.description}</span></Col>
                                    <Col sm={12} lg={2}>Urgency Level: <span>{call.urgentLevel}</span></Col>
                                </Row>
                                <Row >              
                                <Col sm={12} lg={12}> 
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