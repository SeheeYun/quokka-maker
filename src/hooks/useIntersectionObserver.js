import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver() {
  const [isloaded, setIsLoaded] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    let io;
    if (itemRef) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
          } else {
            setIsLoaded(false);
          }
        },
        { threshold: 0.8 }
      );

      io.observe(itemRef.current);
    }

    return () => io && io.disconnect(itemRef);
  }, [itemRef]);

  return { isloaded, itemRef };
}

export default useIntersectionObserver;
