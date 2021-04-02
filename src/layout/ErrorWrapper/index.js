import React from 'react';

import Alert from '../../components/Alert';

const ErrorWrapper = ({children, error}) => {
    return <>{error ? <Alert error={error} /> : children}</>;
};

export default ErrorWrapper;
