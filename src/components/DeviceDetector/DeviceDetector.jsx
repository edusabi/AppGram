// DeviceDetector.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceDetector = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Checa se é um dispositivo móvel
    if (/android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      navigate('/no-mobile-access');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default DeviceDetector;
