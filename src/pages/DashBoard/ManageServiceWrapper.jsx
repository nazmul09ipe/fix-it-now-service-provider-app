import React from 'react';
import PrivateRoute from './../../Components/PrivateRoute';
import ManageServices from './ManageServices';

const ManageServiceWrapper = () => {
    return (
        <div>
            <PrivateRoute><ManageServices></ManageServices></PrivateRoute>
        </div>
    );
};

export default ManageServiceWrapper;