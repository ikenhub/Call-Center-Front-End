import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Import Form and Button components from Bootstrap

const UpdateTicketPage = () => {
    const { id } = useParams(); // Fetch the ticketId from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [ticketData, setTicketData] = useState({
        subject: '',
        callId: '',
        agentId: '',
        description: '',
        status: ''
    });

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tickets/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ticket');
                }
                const data = await response.json();
                setTicketData({
                    subject: data.subject,
                    callId: data.callId,    
                    agentId: data.agentId,
                    description: data.description,
                    status: data.status
                });
            } catch (error) {
                console.error('Error fetching ticket:', error);
            }
        };

        fetchTicket();
    }, [id]); // Ensure useEffect runs whenever id changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicketData({
            ...ticketData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdateTicket(id, ticketData);
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const onUpdateTicket = async (ticketId, updatedTicketData) => {
        try {
            const response = await fetch(`http://localhost:3000/tickets/${ticketId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTicketData),
            });

            if (!response.ok) {
                throw new Error('Failed to update ticket');
            }

            console.log('Ticket updated successfully');
            navigate(`/call/${ticketData.callId}/tickets`); 
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control type="text" name="subject" value={ticketData.subject} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Agent ID:</Form.Label>
                            <Form.Control type="text" name="agentId" value={ticketData.agentId} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={ticketData.description} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status:</Form.Label>
                            <Form.Control as="select" name="status" value={ticketData.status} onChange={handleChange} required>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </Form.Control>
                        </Form.Group>
                        <Button className='mt-2' variant="primary" type="submit">Update Ticket</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTicketPage;
