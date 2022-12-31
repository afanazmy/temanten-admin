import { useEffect } from 'react';
import NProgress from 'nprogress';

const TopProgressBar = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });

  return null;
};

export default TopProgressBar;
