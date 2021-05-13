import './TenantsSection.css'
import TenantCard from '../TenantCard/TenantCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import CrudTenant from '../CrudTenant/CrudTenant'
import { useState } from 'react';



function TenantsSection() {
  const [showCrudModel ,setShowCrudModel] =useState()

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
            <Card.Body onClick={() => setShowCrudModel(true)}>
              <IoAddCircleOutline />
              <h5>New Tenants</h5>
            </Card.Body>
          </Card>
            <TenantCard/>
            <TenantCard/>
            <TenantCard/>   
        </div>
        <CrudTenant
          onClose={() => setShowCrudModel(false)}
          show={showCrudModel}
        />
    </div>
  );
}
export default TenantsSection;
