import { Outlet, Navigate } from 'react-router-dom'
import { useSelector} from 'react-redux';

const PrivateRoutes = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return(
        userInfo && userInfo.token && userInfo.data.includes(props.role) ? <Outlet/> : <Navigate to="/login-register"/>
    )
}

export default PrivateRoutes;