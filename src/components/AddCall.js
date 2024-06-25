import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCall = ({ onAddCall }) => {
    const navigate = useNavigate();
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newCall = {
                time: new Date(time),
                duration: parseInt(duration),
                subject,
                agentId: user._id,
            };

            // Call the onAddCall function passed from AddCallPage
            const createdCall = await onAddCall(newCall);

            navigate('/dashboard'); // Redirect to the dashboard after adding the call
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="my-4">
                        <h2>Add Call</h2>
                        {error && <Alert variant="danger">Error: {error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Date and Time</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Duration (seconds)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Call'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddCall;
