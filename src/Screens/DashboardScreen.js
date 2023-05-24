import React from 'react';
import CreatePatientForm from '../Components/CreatePatientForm';
import CreateDoctorForm from '../Components/CreateDoctorForm';
import CreateHospitalForm from '../Components/CreateHospitalForm';
import CreateLaboratoryFrom from '../Components/CreateLaboratoryForm';
import GetPatientForm from '../Components/GetPatientForm';
import EditUserModal from '../Components/EditUserModal';

function DashboardScreen() {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    roles: ['ADMIN_USER', 'NORMAL_USER'],
  };
  return (
    <div className='main-container m-5'>
      {/* <CreatePatientForm /> */}
      {/* <CreateDoctorForm />
      <CreateHospitalForm />
      <CreateLaboratoryFrom /> */}
      {/* <GetPatientForm /> */}
      {/* <EditUserModal user={user} /> */}
    </div>
  );
}

export default DashboardScreen;
