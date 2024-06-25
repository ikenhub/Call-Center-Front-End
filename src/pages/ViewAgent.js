import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import CallList from '../components/CallList';

const ViewAgent = () => {
    const { agentId } = useParams(); // Access agentId from URL params
    const [agent, setAgent] = useState(null);
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${agentId}`); // Adjust endpoint to fetch agent by ID
                if (!response.ok) {
                    throw new Error('Failed to fetch agent');
                }
                const data = await response.json();
                setAgent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, [agentId]);

    useEffect(() => {
        const fetchCalls = async () => {
            try {
                const response = await fetch(`http://localhost:3000/calls?agentId=${agentId}`); // Adjust endpoint to fetch calls by agentId
                if (!response.ok) {
                    throw new Error('Failed to fetch calls');
                }
                const data = await response.json();
                setCalls(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCalls();
    }, [agentId]);

    if (loading) return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!agent) return <Alert variant="warning">Agent not found</Alert>;

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Agent Details</Card.Title>
                            <Card.Text>Name: {agent.name}</Card.Text>
                            <Card.Text>Email: {agent.email}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <CallList calls={calls} />
                </Col>
            </Row>
        </Container>
    );
};

export default ViewAgent;
