// useGuardedRoute.js
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useGuardedRoute = () => {
  const navigate = useNavigate();
  const credentials = useSelector(state => state.credentials);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!credentials.token) {
      navigate('/iotum-samples/error-handling');
      console.log('New credentials input needed');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [credentials.token, navigate]);

  return isAuthenticated;
};

export default useGuardedRoute;
