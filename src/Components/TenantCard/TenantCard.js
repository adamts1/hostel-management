import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import './TenantCard.css'

function TenantCard(props) {
    
    return (
        <div className="c-tenantcard">
            <Card
                bg="info"
                key="2"
                text='white'
                style={{ width: '20rem' }}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>Tenant Name <span> {props.fname}</span></Card.Title>
                    <hr />
                    <Card.Text>
                        <div><span className="font-weight-bold">Name: </span><span>{props.fname}</span></div>
                        <div><span className="font-weight-bold">Room: </span><span>{props.room}</span></div>
                        <div><span className="font-weight-bold">Email: </span><span>{props.showEmail}</span></div>
                        <div><span className="font-weight-bold">Start: </span><span>{props.start}</span></div>
                        <p><span className="font-weight-bold">End: </span><span>{props.end}</span></p>
                        <p><span className="font-weight-bold">Payment: </span><span>{props.payment}</span></p>
                        <hr />
                        <div className="card-icon-wrper">
                        <Row>
                        <Col xs={4} className="crud-icons">
                                <MdEdit/>
                        </Col>
                        <Col xs={4} className="crud-icons">   
                                <MdDelete/>
                        </Col>        
                        <Col xs={4} className="crud-icons">       
                                <AiOutlineFolderView />
                        </Col>
                        </Row>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default TenantCard;