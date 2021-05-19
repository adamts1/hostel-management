import './TenantsSection.css'
import TenantCard from '../TenantCard/TenantCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import CrudTenant from '../CrudTenant/CrudTenant'
import UserModel from '../../Model/UserModel'
import HostelModel from '../../Model/HostelModel'
import WarningModel from '../../Components/WarningModel/WarningModel'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Parse from 'parse';

function TenantsSection({ activeUser}) {
  const [showCrudModel, setShowCrudModel] = useState()
  const [showWarningModel, setShowWarningModel] = useState();
  const [tenantFName, seTtenantFName] = useState();
  const [tenantLName, seTtenantLName] = useState();
  const [tenantId, seTtenantId] = useState();

  const [hostelInstance, setHostelInstance] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [tenants, setTenant] = useState([])
  const { index } = useParams();


  useEffect(() => {
    async function fetchTenants() {
      try {
        const tenants = await activeUser.getMyTenants(index);
        setTenant(tenants)
      } catch {
        console.log("No Tenants")
      }
    }
    if (activeUser) {
      fetchTenants();
    }
  }, [])

  
  useEffect(() => {
    async function getHostelsInstance() {
      const hostelTable = Parse.Object.extend('Hostel');
      const query = new Parse.Query(hostelTable);
      const parseHostel = await query.get(index);
      const parseHostelInstance = new HostelModel(parseHostel)
      const rooms = await parseHostelInstance.getMyRooms();
      setHostelInstance(parseHostelInstance)
      setRooms(rooms)
    }
    getHostelsInstance();
  }, [])

  async function handleNewTenant(tenantFName, tenantLName, tenantEmail, tenantUsername, tenantPassword, tenantRoom, tenantRoomKey, tenantPayment, tenantStart, tenantEnd, img) {
    const tenant = await UserModel.signupTenant(tenantFName, tenantLName, tenantEmail, tenantUsername, tenantPassword, tenantRoom, tenantRoomKey, tenantPayment, tenantStart, tenantEnd, index, img)
    setTenant(tenants.concat(tenant));
  }

  function handleWarningTenant(tenantfName, tenantlName, tenantId) {
    setShowWarningModel(true)
    seTtenantFName(tenantfName);
    seTtenantLName(tenantlName);
    seTtenantId(tenantId)
  }

  async function handleDeleteTenant() {
    setShowWarningModel(false)
    const userTable =  Parse.Object.extend('User');
    const query =  new Parse.Query(userTable);
    const parseTenant =  await query.get(tenantId);
    const parseRoomInstance =  new UserModel(parseTenant)
    await parseRoomInstance.deactivateTenant();
    const tenant = await activeUser.getMyTenants(index);
    setTenant(tenant)



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
            {...tenant}
            onDelete={handleWarningTenant} />
        )}
      </div>
      <CrudTenant
        onClose={() => setShowCrudModel(false)}
        show={showCrudModel}
        onCreate={handleNewTenant}
        rooms={rooms}
      />
      <WarningModel
        show={showWarningModel}
        onClose={() => setShowWarningModel(false)}
        onDelete={handleDeleteTenant}
        actionOnInstanse="Tenant:  "
        instanseName={tenantFName +" "+tenantLName}
      />
    </div>
  );
}
export default TenantsSection;
