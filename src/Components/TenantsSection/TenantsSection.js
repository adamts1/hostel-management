import './TenantsSection.css'
import TenantCard from '../TenantCard/TenantCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import CrudTenant from '../CrudTenant/CrudTenant'
import UserModel from '../../Model/UserModel'
import HostelModel from '../../Model/HostelModel'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Parse from 'parse';

function TenantsSection({activeUser}) {
  const [showCrudModel, setShowCrudModel] = useState()
  const [tenants, setTenant] = useState([])
  const { index } = useParams();

  useEffect(() => {
    async function fetchTenants() {
      try{
        const tenants = await activeUser.getMyTenants(index);
        setTenant(tenants)
      }catch{
        console.log("No Tenants")
      }
    }
    if (activeUser) {
      fetchTenants();
    }
  }, [])

  async function handleNewTenant(tenantFName, tenantLName ,tenantEmail, tenantUsername,tenantPassword, tenantRoom, tenantPayment, tenantStart, tenantEnd, img) {
    const tenant = await UserModel.signupTenant(tenantFName, tenantLName ,tenantEmail, tenantUsername,tenantPassword, tenantRoom, tenantPayment, tenantStart, tenantEnd, index, img)
    setTenant(tenants.concat(tenant));
  }

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
      {tenants.map(tenant =>
              <TenantCard
                {...tenant}/>
          )}
    </div>
    <CrudTenant
      onClose={() => setShowCrudModel(false)}
      show={showCrudModel}
      onCreate={handleNewTenant}
    />
  </div>
);
}
export default TenantsSection;
