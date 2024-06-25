import React, { useState, useEffect } from 'react';
import CallList from '../components/CallList';
import CallListActions from '../components/CallListActions';
import { useAuth } from '../context/auth'; // Adjust this to your authentication context or method

const CallListPage = () => {
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    useEffect(() => {
        const fetchCalls = async () => {
            try {
                let url = 'http://localhost:3000/calls';

                if (user.role === 'agent') {
                    url += `?agentId=${user._id}`; // Fetch calls where agentId matches user's _id
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch calls');
                }
                const data = await response.json();
                setCalls(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCalls();
    }, [user]);

    const handleAddTicket = (callId) => {
        console.log(`Add ticket for call with ID: ${callId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Call List</h1>
            <CallListActions />
            <CallList calls={calls} handleAddTicket={handleAddTicket} />
        </div>
    );
};

export default CallListPage;
