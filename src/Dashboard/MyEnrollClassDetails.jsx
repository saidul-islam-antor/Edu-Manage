import React from 'react';
import { useParams } from 'react-router';

const MyEnrollClassDetails = () => {
    const{id}=useParams()
    console.log(id)
    return (
        <div>
            hello
        </div>
    );
};

export default MyEnrollClassDetails;