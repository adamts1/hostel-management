import './HostelAccordion.css'
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';





function HostelAccordion({hostelKey , hostelAddress, hostelName, numberOfRooms}) {
    return (
        <div className="c-hostelaccordion">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={hostelKey}>
                        <IoIosArrowDropdown color="white"/> <span>{hostelName}</span>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={hostelKey}>
                    <Card.Body>
                        <Row>
                            <Col sm={12} lg={3}>Name: <span>{hostelName}</span></Col>
                            <Col sm={12} lg={3}>Address: <span>{hostelAddress}</span></Col>
                            <Col sm={12} lg={3}># Rooms: <span>{numberOfRooms}</span></Col>
                            <Col sm={12} lg={3} className="crud-icons" sm={12}>
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

export default HostelAccordion;