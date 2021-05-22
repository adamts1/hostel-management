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
                <Card.Img variant="top" src={props.img.url()} />
                <Card.Body>
                    <Card.Text>
                        <div><span className="font-weight-bold">Name: </span><span>{props.fname + " " + props.lname}</span></div>
                        <div><span className="font-weight-bold">Room: </span><span>{props.room}</span></div>
                        <div><span className="font-weight-bold">Email: </span><span>{props.showEmail}</span></div>
                        <div><span className="font-weight-bold">Start: </span><span>{props.start}</span></div>
                        <p><span className="font-weight-bold">End: </span><span>{props.end}</span></p>
                        <p><span className="font-weight-bold">Payment: </span><span>{props.payment}</span></p>
                        <div className="card-icon-wrper">
                            <Row>
                                <Col xs={6} className="crud-icons">
                                    <MdEdit />
                                </Col>  
                                <Col xs={6} className="crud-icons">
                                    <MdDelete onClick={()=>props.onDelete(props.fname, props.lname, props.id)} />
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