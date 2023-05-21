import React from 'react';
import CreatePatientForm from '../Components/CreatePatientForm';
import CreateDoctorForm from '../Components/CreateDoctorForm';
import CreateHospitalForm from '../Components/CreateHospitalForm';
import CreateLaboratoryFrom from '../Components/CreateLaboratoryForm';
import GetPatientForm from '../Components/GetPatientForm';

function DashboardScreen() {
  return (
    <div className='main-container m-5'>
      {/* <CreatePatientForm />
      <CreateDoctorForm />
      <CreateHospitalForm />
      <CreateLaboratoryFrom /> */}
      <GetPatientForm />

    </div>
  );
}

export default DashboardScreen;
