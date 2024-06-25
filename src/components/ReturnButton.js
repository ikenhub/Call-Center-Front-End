import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnButton = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleReturn}>Return</button>
    );
};

export default ReturnButton;
