import './TenantsSection.css'
import TenantCard from '../TenantCard/TenantCard'
import { Card } from 'react-bootstrap';
import { IoAddCircleOutline } from 'react-icons/io5';
import CrudTenant from '../CrudTenant/CrudTenant'
import { useState } from 'react';
import Parse from 'parse';



function TenantsSection() {
  const [showCrudModel, setShowCrudModel] = useState()

  async function handleNewTenant(tenantName ,tenantEmail, tenantUsername,tenantPassword, tenantRoom, tenantPayment, tenantStart, tenantEnd) {
    var user = new Parse.User();
    user.set("username", tenantUsername);
    user.set("password", tenantPassword);
    user.set("tenant", true);
    user.set("start", tenantStart);

    var sessionToken = Parse.User.current().get("sessionToken");
    //at this point the "teacher" is the current user
    //i save this user session for use later
    user.signUp(null, {
      success: function (user) {
        //right now i have successfully signed up a new "student" and am actually logged in as that student
        Parse.User.become(sessionToken).then(function (user) {
          // The current user is now set back to the teacher.
          // Continue doing what you want
        }, function (error) {
          // The token could not be validated.
          alert('error');
        });
      },
      error: function (user, error) {
        //Show the error message somewhere and let the user try again                    alert("Error: " + error.code + " " + error.message);
      }
    });
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
      <TenantCard />
      <TenantCard />
      <TenantCard />
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
