import './CallAccordion.css'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';


function CallAccordion({call, onDelete}) {


    return (
        <div className="c-callaccordion">
            <Card>
            <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={call.id}>
                        <IoIosArrowDropdown color="white" /> <span>{call.title}</span>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={call.id}>
                    <Card.Body>
                        <Row>
                                <Col sm={12} lg={3}>Title: <span>{call.title}</span></Col>
                                <Col sm={12} lg={3}>Description: <span>{call.description}</span></Col>
                                <Col sm={12} lg={3}>Urgency Level: <span>{call.urgentLevel}</span></Col>
                                <Col sm={12} lg={3} className="crud-icons" sm={12}>
                            <Button variant="secondary" onClick={()=>onDelete(call)} ><span>Remove Call</span></Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    );
}

export default CallAccordion;