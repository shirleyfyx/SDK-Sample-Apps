import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useGuardedRoute = () => {
  const navigate = useNavigate();
  const credentials = useSelector(state => state.credentials);

  useEffect(() => {
    // Redirect to TokenPage if credentials are invalid
    if (!credentials.token) {
      navigate('/');
      console.log('New credentials input needed')
    }
  }, [credentials.token, navigate]);
};

export default useGuardedRoute;
