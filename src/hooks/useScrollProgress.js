import { useState, useEffect } from 'react';

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mainEl = document.querySelector('main');
    
    const handleScroll = () => {
      if (!mainEl) return;
      
      const totalHeight = mainEl.scrollHeight - mainEl.clientHeight;
      const currentScroll = mainEl.scrollTop;
      const normalizedProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;
      setProgress(normalizedProgress);
    };

    if (mainEl) {
      mainEl.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
    }

    return () => {
      if (mainEl) {
        mainEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return progress;
};

export default useScrollProgress;
