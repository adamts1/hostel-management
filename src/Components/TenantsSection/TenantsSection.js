import './TenantsSection.css'
import TenantCard from '../TenantCard/TenantCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';



function TenantsSection() {
  return (
    <div className='c-tenantssection'>

        <div className="cards-warper">
          <Card
            bg="info"
            key="1"
            text='white'
            style={{ width: '20rem' }}
            className="mb-2 add-card"
          >
            <Card.Body>
              <IoAddCircleOutline />
              <h5>New Tenants</h5>
            </Card.Body>
          </Card>
            <TenantCard/>
            <TenantCard/>
            <TenantCard/>   
        </div>
    </div>
  );
}
export default TenantsSection;
