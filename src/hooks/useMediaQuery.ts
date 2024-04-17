'use client';

import {useCallback, useEffect, useState} from 'react';

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState<boolean>(false);

  const updateTarget = useCallback((event: Event) => {
    if (event?.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(`(max-width:${width}px)`);
      media.addEventListener('change', updateTarget);

      if (media.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }

      return () => media.removeEventListener('change', updateTarget);
    }
  }, [updateTarget, width]);

  return targetReached;
};

export default useMediaQuery;
