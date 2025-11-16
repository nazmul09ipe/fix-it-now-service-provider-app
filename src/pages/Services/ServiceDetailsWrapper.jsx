import React from 'react';
import PrivateRoute from './../../Components/PrivateRoute';
import ServiceDetails from './ServiceDetails';

const ServiceDetailsWrapper = () => {
    return (
        <div>
            <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>
        </div>
    );
};

export default ServiceDetailsWrapper;