import React from 'react';
import PrivateRoute from './../../Components/PrivateRoute';
import BookService from './BookService';

const BookServiceWrapper = () => {
    return (
        <div>
            <PrivateRoute><BookService></BookService></PrivateRoute>
        </div>
    );
};

export default BookServiceWrapper;