import { useEffect, useState } from 'react';

const useMatchMedia = breakpoint => {
  const [isMatches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    if (mediaQuery.matches !== isMatches) {
      setMatches(mediaQuery.matches);
    }

    mediaQuery.addEventListener('change', e => {
      setMatches(e.matches);
    });
    return () =>
      mediaQuery.removeEventListener('change', e => {
        setMatches(e.matches);
      });
  }, []);

  return { isMatches };
};

export default useMatchMedia;
