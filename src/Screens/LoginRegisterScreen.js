import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { signin, register } from '../actions/userActions';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { useNavigate, useLocation } from 'react-router-dom';



export default function LoginRegisterScreen(props) {
    const [loginRegisterActive, setLoginRegisterActive] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [againPassword, setAgainPassword] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [againPasswordValid, setAgainPasswordValid] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
      
    const handleLoginRegisterClick = (type) => {
        setLoginRegisterActive(type);
    };
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const dispatch = useDispatch();
    const handleSubmitLogin = (event) => {
        event.preventDefault();
        if(passwordValid && emailValid){
            dispatch(signin(email, password));
        }
    }
    const userRegister = useSelector((state) => state.userRegister);
    const loadingReg = userRegister.loading;
    const errorReg = userRegister.error;
    const handleSubmitRegister = (event) => {
        event.preventDefault();
        if(passwordValid && emailValid && againPasswordValid){
            dispatch(register(name, email, password));
            console.log("inside");
        }
        console.log("after");
    }
    useEffect(() => {
        if (userInfo && (userInfo.data.includes("RESCUE_USER") || userInfo.data.includes("POLICE_USER"))) {
          const redirect = location.search ? location.search.split('=')[1] : '/';
          navigate(redirect);
        }
      }, [navigate, location.search, userInfo]);
    const validateEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(e.target.value));
    };
    const validatePassword = (e) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        setPasswordValid(passwordRegex.test(e.target.value));
    }
           
    const validateAgainPassword = (e) => {
        setAgainPasswordValid(password === e.target.value);
    }
    return (
        <>
            <div className='center-div'>
                <div>
                    <MDBTabs pills justify className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleLoginRegisterClick('login')}
                                active={loginRegisterActive === 'login'}
                            >
                                Login
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleLoginRegisterClick('register')}
                                active={loginRegisterActive === 'register'}
                            >
                                Register
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    <MDBTabsContent>
                        <MDBTabsPane show={loginRegisterActive === 'login'}>
                            <form onSubmit={handleSubmitLogin}>
                                <MDBInput
                                    className={`mb-4 ${emailValid ? 'is-valid' : 'is-invalid'}`}
                                    type='email'
                                    label='Email address'
                                    value={email}
                                    onChange={(e) => {
                                        setEmailValid(false)
                                        setEmail(e.target.value);
                                        validateEmail(e);
                                    }}
                                    required
                                />
                                <MDBInput
                                    className={`mb-4 ${passwordValid ? 'is-valid' : 'is-invalid'}`}
                                    type='password'
                                    label='Password'
                                    value={password}
                                    onChange={(e) => {
                                        setPasswordValid(false)
                                        setPassword(e.target.value);
                                        setPasswordValid(false);
                                        validatePassword(e);
                                    }}
                                    required
                                />
                                {/* <MDBCheckbox label='Remember me' /> */}
                            <MDBRow className='mb-0'>
                            {loading && <LoadingBox/>}
                            {error && (
                            error.response  ? (
                            error.response.status === 401 ? <MessageBox variant="danger">Wrong Email and Password</MessageBox>
                            :error.response.data.message ? <MessageBox variant="danger">{error.response.data.message}</MessageBox>:
                            error.response.data.status && <MessageBox variant="danger">Request Failed with status code {error.response.data.status}</MessageBox>)
                            :error.message && <MessageBox variant="danger">{error.message}</MessageBox>
                            )
                            }
                            </MDBRow>
                            <MDBBtn type='submit' className='mb-4' block disabled={loading}>
                                Sign in
                            </MDBBtn>
                            <div className='text-center'>
                                <p>
                                    Not a member? <span style={{ cursor: 'pointer' }} onClick={() => handleLoginRegisterClick('register')}>Register</span>
                                </p>
                            </div>
                            </form>
                        </MDBTabsPane>
                        <MDBTabsPane show={loginRegisterActive === 'register'}>
                            <form onSubmit={handleSubmitRegister}>
                                <MDBInput
                                    className={`mb-4 ${nameValid ? 'is-valid' : 'is-invalid'}`}
                                    type='text'
                                    label='Full name'
                                    value={name}
                                    onChange={(e) => {
                                        setNameValid(false);
                                        setName(e.target.value);
                                        if(e.target.value){
                                            setNameValid(true);
                                        } 
                                    }}
                                    required
                                />
                                <MDBInput
                                    className={`mb-4 ${emailValid ? 'is-valid' : 'is-invalid'}`}
                                    type='email'
                                    label='Email address'
                                    value={email}
                                    onChange={(e) => {
                                        setEmailValid(false)
                                        setEmail(e.target.value);
                                        validateEmail(e);
                                    }}
                                    required
                                />
                                <MDBInput
                                    className={`mb-4 ${passwordValid ? 'is-valid' : 'is-invalid'}`}
                                    type='password'
                                    label='Password'
                                    value={password}
                                    onChange={(e) => {
                                        setPasswordValid(false)
                                        setPassword(e.target.value);
                                        setPasswordValid(false);
                                        validatePassword(e);
                                    }}
                                    required
                                    feedback="Please choose a stronger password."
                                    feedbackType="invalid"
                                />

                                <MDBInput
                                    className={`mb-4 ${againPasswordValid ? 'is-valid' : 'is-invalid'}`}
                                    type='password'
                                    label='Confirm password'
                                    value={againPassword}
                                    onChange={(e) => {
                                        setAgainPasswordValid(false);
                                        setAgainPassword(e.target.value);
                                        validateAgainPassword(e);
                                    }}
                                    required
                                />
                                <MDBCheckbox
                                wrapperClass='mb-4'
                                label='I agree to the terms and conditions'
                                required
                            />
                            <MDBRow className='mb-0'>
                            {loadingReg && <LoadingBox/>}
                            {errorReg && (
                            errorReg.response  ? (
                            errorReg.response.status === 401 ? <MessageBox variant="danger">Wrong Email and Password</MessageBox>
                            :errorReg.response.data.message ? <MessageBox variant="danger">{errorReg.response.data.message}</MessageBox>:
                            errorReg.response.data.status && <MessageBox variant="danger">Request Failed with status code {errorReg.response.data.status}</MessageBox>)
                            :errorReg.message && <MessageBox variant="danger">{errorReg.message}</MessageBox>
                            )
                            }
                            </MDBRow>
                            <MDBBtn type='submit' className='mb-4' block disabled={loadingReg} >
                                Register
                            </MDBBtn>
                            <div className='text-center'>
                                <p>
                                    Already a member? <span style={{ cursor: 'pointer' }} onClick={() => handleLoginRegisterClick('login')}>Login</span>
                                </p>
                            </div>
                            </form>
                        </MDBTabsPane>
                    </MDBTabsContent>
                </div>
            </div>
        </>
    );
}                                       
