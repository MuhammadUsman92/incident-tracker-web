import React from 'react';
import CreatePatientForm from '../Components/CreatePatientForm';
import DoctorFrom from '../Components/DoctorForm';
import CreateHospitalForm from '../Components/CreateHospitalForm';
import CreateLaboratoryFrom from '../Components/CreateLaboratoryFrom';

function DashboardScreen() {
  return (
    <div className='container mt-5'>
      <CreatePatientForm/>
      <DoctorFrom/>
      <CreateHospitalForm/>
      <CreateLaboratoryFrom/>
    </div>
  );
}

export default DashboardScreen;
