import './HostelPage.css'
import { Card, Container, Row, Button, Col } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';

import { useParams } from 'react-router';

function HostelPage() {

  const { index } = useParams();
  return (
    <div className='p-hostelpage'>
      <Container>
        <Row className="p-1 align-items-center">
          <Col>
            <h1>Jerusalem Hostel</h1>
          </Col>
        </Row>
        <hr />
        <div className="cards-warper">
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2 add-card"
          >
            <Card.Body>
              <IoAddCircleOutline/>
              <h5>Add New Room</h5>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title>Room Number <span> 30</span></Card.Title>
              <hr/>
              <Card.Text>
                <div><span className="font-weight-bold">Calls: </span><span>0</span></div>
                <div><span className="font-weight-bold">Tenants: </span><span>5</span></div>
                <hr/>
                <p><span className="font-weight-bold">Notes: </span><span>Lorem ipsum sssss</span></p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title>Room Number <span> 30</span></Card.Title>
              <hr/>
              <Card.Text>
                <div><span className="font-weight-bold">Calls: </span><span>0</span></div>
                <div><span className="font-weight-bold">Tenants: </span><span>5</span></div>
                <hr/>
                <p><span className="font-weight-bold">Notes: </span><span>Lorem ipsum sssss</span></p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Title>Room Number <span> 30</span></Card.Title>
              <hr/>
              <Card.Text>
                <div><span className="font-weight-bold">Calls: </span><span>0</span></div>
                <div><span className="font-weight-bold">Tenants: </span><span>5</span></div>
                <hr/>
                <p><span className="font-weight-bold">Notes: </span><span>Lorem ipsum sssss</span></p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title> Card Title </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
      </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title> Card Title </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
      </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title> Card Title </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
      </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title> Card Title </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
      </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title> Card Title </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
      </Card.Text>
            </Card.Body>
          </Card>
          <Card
            bg="info"
            key="2"
            text='white'
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Title> Card Title </Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
      </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>

    </div>
  );
}

export default HostelPage;
