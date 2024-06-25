import React, { useState, useEffect } from 'react';
import CallList from '../components/CallList';
import CallListActions from '../components/CallListActions';

const DashboardPage = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        let url = 'http://localhost:3000/calls';

        if (user.role === 'agent') {
          url += `?agentId=${user._id}`;
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
  }, []);

  const handleModify = (callId) => {
    console.log(`Modify call with ID: ${callId}`);
  };

  const handleAddTicket = (callId) => {
    console.log(`Add ticket for call with ID: ${callId}`);
  };

  const filteredCalls = calls.filter(call =>
    call.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <CallListActions setSearchTerm={setSearchTerm} />
      <CallList calls={filteredCalls} handleModify={handleModify} handleAddTicket={handleAddTicket} />
    </div>
  );
};

export default DashboardPage;
