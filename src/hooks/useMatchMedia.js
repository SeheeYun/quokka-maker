import { useEffect, useState } from 'react';

const useMatchMedia = breakpoint => {
  const [isMatches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    if (mediaQuery.matches !== isMatches) {
      setMatches(mediaQuery.matches);
    }

    function updateMatches(e) {
      setMatches(e.matches);
    }

    mediaQuery.addEventListener('change', updateMatches);
    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, []);

  return { isMatches };
};

export default useMatchMedia;
