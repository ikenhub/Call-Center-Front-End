import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button component from Bootstrap

const CallList = ({ calls }) => {
    const navigate = useNavigate();

    const handleAddTicket = (callId, agentId) => {
        navigate(`/call/${callId}/add-ticket/${agentId}`);
    };

    const handleViewTickets = (callId) => {
        navigate(`/call/${callId}/tickets`);
    };

    const handleModify = (callId) => {
        navigate(`/update-call/${callId}`);
    };

    return (
        <div>
            <h2>Call List</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Agent Name</th>
                        <th>Time</th>
                        <th>Duration (seconds)</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {calls.map(call => (
                        <tr key={call._id}>
                            <td>{call.agentId.name}</td>
                            <td>{new Date(call.time).toLocaleString()}</td>
                            <td>{call.duration}</td>
                            <td>{call.subject}</td>
                            <td>
                                <Button variant="info" onClick={() => handleModify(call._id)}>Modify</Button>{' '}
                                <Button variant="success" onClick={() => handleAddTicket(call._id, call.agentId._id)}>Add Ticket</Button>{' '}
                                <Button variant="primary" onClick={() => handleViewTickets(call._id)}>View Tickets</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CallList;
