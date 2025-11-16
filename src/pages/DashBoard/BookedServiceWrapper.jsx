import React from 'react';
import PrivateRoute from './../../Components/PrivateRoute';
import BookedServices from './BookedServices';

const BookedServiceWrapper = () => {
    return (
        <div>
           < PrivateRoute><BookedServices></BookedServices></PrivateRoute>
        </div>
    );
};

export default BookedServiceWrapper;