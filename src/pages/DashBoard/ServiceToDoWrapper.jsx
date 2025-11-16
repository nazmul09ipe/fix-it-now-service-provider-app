import React from 'react';
import PrivateRoute from './../../Components/PrivateRoute';
import ServiceToDo from './ServiceToDo';

const ServiceToDoWrapper = () => {
    return (
        <div>
            <PrivateRoute><ServiceToDo></ServiceToDo></PrivateRoute>
        </div>
    );
};

export default ServiceToDoWrapper;