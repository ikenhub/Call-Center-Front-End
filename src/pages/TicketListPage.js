import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button component from Bootstrap

const TicketListPage = () => {
    const { callId } = useParams();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`http://localhost:3000/calls/${callId}/tickets`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [callId]);

    const handleModify = (ticketId) => {
        navigate(`/update-ticket/${ticketId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Tickets for Call {callId}</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Subject</th>
                        <th>Agent</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id}>
                            <td>{ticket.subject}</td>
                            <td>{ticket.agentId.name}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <Link to={`/tickets/${ticket._id}/comments`} className="btn btn-primary mr-2">Comments</Link>
                                <Button variant="info" onClick={() => handleModify(ticket._id)}>Modify</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketListPage;
