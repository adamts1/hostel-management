import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import { AiOutlineFolderView } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import './TenantCard.css'

function TenantCard() {
    
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
                    <Card.Title>Tenant Name <span> Adam</span></Card.Title>
                    <hr />
                    <Card.Text>
                        <div><span className="font-weight-bold">Name: </span><span>Adam</span></div>
                        <div><span className="font-weight-bold">Room: </span><span>15</span></div>
                        <div><span className="font-weight-bold">Email: </span><span>AdamTsityat@gmail.com</span></div>
                        <div><span className="font-weight-bold">Start: </span><span>1/1/2021</span></div>
                        <p><span className="font-weight-bold">End: </span><span>1/3/2021</span></p>
                        <p><span className="font-weight-bold">Payment: </span><span>2500</span></p>
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