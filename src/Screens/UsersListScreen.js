import React, { useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';

function UsersListScreen() {
    const getUsers = useSelector((state) => state.getUsersAll);
    const { loading, response, error } = getUsers;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <>
            <Container fluid className='m-4'>
                <Row className='mt-4'>
                    <h5 className="head-div">All Users</h5>
                </Row>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {response && (
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className='p-1'>ID</th>
                                    <th className='p-1'>Name</th>
                                    <th className='p-1'>Email</th>
                                    <th className='p-1'>ADMIN_USER</th>
                                    <th className='p-1'>NORMAL_USER</th>
                                    <th className='p-1'>RESCUE_USER</th>
                                    <th className='p-1'>RESCUE_ADMIN</th>
                                    <th className='p-1'>HOSPITAL_ADMIN</th>
                                    <th className='p-1'>POLICE_USER</th>
                                    <th className='p-1'>POLICE_ADMIN</th>
                                    <th className='p-1'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {response.data.content.map((user) => (
                                    <tr className='text-center' key={user.id}>
                                        <td className='p-1'>{user.id}</td>
                                        <td className='p-1'>{user.name}</td>
                                        <td className='p-1'>{user.email}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'ADMIN_USER') ? '✅' : '❎'}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'ROLE_NORMAL') ? '✅' : '❎'}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'RESCUE_USER') ? '✅' : '❎'}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'RESCUE_ADMIN') ? '✅' : '❎'}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'HOSPITAL_ADMIN') ? '✅' : '❎'}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'POLICE_USER') ? '✅' : '❎'}</td>
                                        <td className='p-1'>{user.roles.some(role => role.name === 'POLICE_ADMIN') ? '✅' : '❎'}</td>
                                        <td className='p-1'>
                                            <Row>
                                                <Col>
                                                    <Button className='p-2' variant="primary">Edit</Button>
                                                </Col>
                                                <Col>
                                                    <Button className='p-2' variant="danger">Delete</Button>
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
        </>
    );
}

export default UsersListScreen;
