import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';

import { editUserRole } from "../actions/editRoleActions";

const allRoles = [
  "ADMIN_USER",
  "NORMAL_USER",
  "RESCUE_USER",
  "RESCUE_ADMIN",
  "HOSPITAL_ADMIN",
  "POLICE_USER",
  "POLICE_ADMIN",
]; // Array of all available roles

function EditUserModal({ user, show, handleClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);
  const navigate=useNavigate();
  const [hospitalRegNo, setHospitalRegNo] = useState(
    user.roles.includes("HOSPITAL_ADMIN") ? user.hospitalRegNo || "" : ""
  );

  const handleSave = () => {
    // Perform validation checks
    if (!name) {
      alert("Name is required");
      return;
    }
    if (!email) {
      alert("Email is required");
      return;
    }
    // Perform save operation here or dispatch an action to update the user data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Roles:", roles);
    const formData = {
      name: name,
      email: email,
      roles: roles,
      hospitalRegNo: hospitalRegNo,
    };
    dispatch(editUserRole(navigate,user.id,formData));
    console.log("Hospital Registration Number:", hospitalRegNo);
    handleClose();
  };

  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add the selected role to the roles array
      setRoles((prevRoles) => [...prevRoles, value]);
      if (value === "HOSPITAL_ADMIN") {
        setHospitalRegNo("");
      }
    } else {
      // Remove the deselected role from the roles array
      setRoles((prevRoles) => prevRoles.filter((role) => role !== value));
      if (value === "HOSPITAL_ADMIN") {
        setHospitalRegNo("");
      }
    }
    
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {roles.includes("HOSPITAL_ADMIN") && (
              <Form.Group controlId="hospitalRegNo">
                <Form.Label>Hospital Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  value={hospitalRegNo}
                  onChange={(e) => setHospitalRegNo(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group controlId="roles">
              <Form.Label>Roles</Form.Label>
              {allRoles.map((role) => (
                <Form.Check
                  key={role}
                  type="checkbox"
                  id={role}
                  label={role}
                  value={role}
                  checked={roles.includes(role)}
                  onChange={handleRoleChange}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;
