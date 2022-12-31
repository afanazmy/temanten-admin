import { Suspense } from 'react';
import { TopProgressBar } from 'components';

const Loadable = ({ children, fallback, ...props }) => {
  return (
    <Suspense {...props} fallback={fallback || <TopProgressBar />}>
      {children}
    </Suspense>
  );
};

export default Loadable;
