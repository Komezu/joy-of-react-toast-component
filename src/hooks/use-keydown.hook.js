import React from 'react';

const useKeydown = (key, callback) => {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === key) {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [key, callback]);
};

export default useKeydown;
