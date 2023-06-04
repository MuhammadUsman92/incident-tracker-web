import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../actions/userActions";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import EditUserModal from "../Components/EditUserModal";

function UsersListScreen() {
  const getUsers = useSelector((state) => state.getUsersAll);
  const { loading, response, error } = getUsers;
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setUserToEdit(user);
    setShow(true);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Row className="mt-4">
          <h5 className="head-div">All Users</h5>
        </Row>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {response && (
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="p-0">ID</th>
                  <th className="p-0 col-width">Name</th>
                  <th className="p-0 col-width">Email</th>
                  <th className="p-0">ROLE_ADMIN</th>
                  <th className="p-0">ROLE_NORMAL</th>
                  <th className="p-0">RESCUE_USER</th>
                  <th className="p-0">RESCUE_ADMIN</th>
                  <th className="p-0">HOSPITAL_ADMIN</th>
                  <th className="p-0">POLICE_USER</th>
                  <th className="p-0">POLICE_ADMIN</th>
                  <th className="p-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.data.content.map((user) => (
                  <tr className="text-center" key={user.id}>
                    <td className="p-0">{user.id}</td>
                    <td className="p-0 col-width">{user.name}</td>
                    <td className="p-0 col-width">{user.email}</td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "ROLE_ADMIN")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "ROLE_NORMAL")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "RESCUE_USER")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "RESCUE_ADMIN")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "HOSPITAL_ADMIN")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "POLICE_USER")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      {user.roles.some((role) => role.name === "POLICE_ADMIN")
                        ? "✅"
                        : "❎"}
                    </td>
                    <td className="p-0">
                      <Row>
                        <Col>
                          <Button
                            className="p-2"
                            variant="primary"
                            onClick={() => handleShow(user)}
                          >
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        )}
      </Container>
      {userToEdit && (
        <EditUserModal
          user={{
            id: userToEdit.id,
            name: userToEdit.name,
            email: userToEdit.email,
            roles: userToEdit.roles.map((role) => role.name),
            hospitalRegNo: userToEdit.hospitalRegNo,
          }}
          show={show}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default UsersListScreen;
