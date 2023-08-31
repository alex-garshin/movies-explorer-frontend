import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/utils';

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const jwt = getFromLocalStorage('jwt');

    useEffect(() => {
        if(!jwt) {
            navigate('/');
        }
    },[]);

    return children;
}

export default ProtectedRoute;
