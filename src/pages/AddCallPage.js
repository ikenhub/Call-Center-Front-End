import React from 'react';
import AddCall from '../components/AddCall';
import { useNavigate } from 'react-router-dom';

const AddCallPage = () => {
    const navigate = useNavigate();

    const handleAddCall = async (newCall) => {
        try {
            const response = await fetch('http://localhost:3000/calls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCall),
            });

            if (!response.ok) {
                throw new Error('Failed to add call');
            }

            const call = await response.json();
            console.log('Call added successfully');
            return call; // Return the created call
        } catch (error) {
            console.error('Error adding call:', error);
        }
    };

    return (
        <div>
            <h1>Add Call</h1>
            <AddCall onAddCall={handleAddCall} />
        </div>
    );
};

export default AddCallPage;
