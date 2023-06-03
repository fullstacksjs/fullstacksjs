import { useEffect, useState } from 'react';

const useIsDeviceTablet = () => {
  const [isMobile, setIsMobile] = useState(false);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return [isMobile];
};

export default useIsDeviceTablet;
