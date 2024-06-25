import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Import Form and Button components from Bootstrap

const TicketCommentsList = () => {
    const { ticketId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tickets/${ticketId}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [ticketId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetch(`http://localhost:3000/tickets/${ticketId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    content: newComment,
                    userId: user._id,
                    ticketId: ticketId, // Include the ticketId in the request body
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const data = await response.json();
            setComments([...comments, data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h2>Comments for Ticket {ticketId}</h2>
            <ul className="list-group mb-4">
                {comments.map(comment => (
                    <li key={comment._id} className="list-group-item mb-3">
                        <strong>{comment.userId.name}</strong> 
                        <div className="text-muted" style={{ fontSize: '0.875em' }}>
                            {new Date(comment.createdAt).toLocaleString()}
                        </div>
                        <p className="mt-2">{comment.content}</p>
                    </li>
                ))}
            </ul>
            <Form onSubmit={handleAddComment} className="mb-4">
                <Form.Group>
                    <Form.Label>Add a Comment:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">Add Comment</Button>
            </Form>
        </div>
    );
};

export default TicketCommentsList;
