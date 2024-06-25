import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl } from 'react-bootstrap'; // Import Bootstrap components

const CallListActions = ({ setSearchTerm }) => {
    const navigate = useNavigate();

    const handleAddCall = () => {
        navigate('/add-call');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="d-flex justify-content-start align-items-center mb-3">
            <FormControl
                type="text"
                placeholder="Search calls..."
                onChange={handleSearch}
                style={{ width: 'auto', marginRight: '10px' }}
            />
            <Button variant="primary" onClick={handleAddCall}>Add Call</Button>
        </div>
    );
};

export default CallListActions;
