import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UpdateCallPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [callData, setCallData] = useState({
        time: '',
        duration: '',
        subject: ''
    });

    useEffect(() => {
        const fetchCall = async () => {
            try {
                const response = await fetch(`http://localhost:3000/calls/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch call');
                }
                const data = await response.json();
                setCallData({
                    time: data.time,
                    duration: data.duration,
                    subject: data.subject
                });
            } catch (error) {
                console.error('Error fetching call:', error);
            }
        };

        fetchCall();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCallData({
            ...callData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onUpdateCall(id, callData);
        } catch (error) {
            console.error('Error updating call:', error);
        }
    };

    const onUpdateCall = async (callId, updatedCallData) => {
        try {
            const response = await fetch(`http://localhost:3000/calls/${callId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCallData),
            });

            if (!response.ok) {
                throw new Error('Failed to update call');
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating call:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="my-4">Update Call</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Time:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="time"
                                value={callData.time}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration (seconds):</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                value={callData.duration}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={callData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button className='mt-2' variant="primary" type="submit">
                            Update Call
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateCallPage;
