import './CallAccordion.css'
import { Accordion, Card, Button, Row, Col, Link } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';


function CallAccordion() {

    return (
        <div className="c-callaccordion">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <IoIosArrowDropdown color="white" /> <span>title</span>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Row>
                            <Col sm={12} lg={2}>Title: <span>Title</span></Col>
                            <Col sm={12} lg={2}>Description: <span>Description</span></Col>
                            <Col sm={12} lg={2}>Urgency Level: <span>Urgency Level</span></Col>
                            <Col sm={12} lg={2}>Status: <span>Status</span></Col>
                            <Col sm={12} lg={2}>Note: <span>Note</span></Col>
                            <Col sm={12} lg={2} className="crud-icons" sm={12}>
                                <MdEdit/>
                                <MdDelete/>
                                <AiOutlineFolderView/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    );
}

export default CallAccordion;