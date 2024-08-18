import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'http://localhost:8080/api/issues';

const IssueApp = () => {
    const [issue, setIssue] = useState({ id: '', title: '', description: '' });
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Create
    const createIssue = async () => {
        try {
            setLoading(true);
            const response = await axios.post(apiUrl, issue);
            setIssues([...issues, response.data]);
            setIssue({ id: '', title: '', description: '' }); // Clear the form after submission
            setError('');
        } catch (err) {
            setError('Failed to create issue');
        } finally {
            setLoading(false);
        }
    };

    // Read
    const readIssue = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/${id}`);
            console.log(response.data);
            setError('');
        } catch (err) {
            setError('Failed to read issue');
        } finally {
            setLoading(false);
        }
    };

    // Update
    const updateIssue = async (id) => {
        try {
            setLoading(true);
            const response = await axios.put(`${apiUrl}/${id}`, issue);
            console.log(response.data);
            setError('');
        } catch (err) {
            setError('Failed to update issue');
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const deleteIssue = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${apiUrl}/${id}`);
            console.log(response.data);
            setIssues(issues.filter((issue) => issue.id !== id)); // Remove the deleted issue from the list
            setError('');
        } catch (err) {
            setError('Failed to delete issue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Issue Tracker</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Manage Issue</h5>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ID"
                            value={issue.id}
                            onChange={(e) => setIssue({ ...issue, id: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={issue.title}
                            onChange={(e) => setIssue({ ...issue, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={issue.description}
                            onChange={(e) => setIssue({ ...issue, description: e.target.value })}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={createIssue} disabled={loading}>
                            {loading ? 'Creating...' : 'Create Issue'}
                        </button>
                        <button className="btn btn-info" onClick={() => readIssue(issue.id)} disabled={loading}>
                            {loading ? 'Reading...' : 'Read Issue'}
                        </button>
                        <button className="btn btn-warning" onClick={() => updateIssue(issue.id)} disabled={loading}>
                            {loading ? 'Updating...' : 'Update Issue'}
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteIssue(issue.id)} disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete Issue'}
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-center mb-4">All Issues</h2>
            {issues.length > 0 ? (
                <ul className="list-group">
                    {issues.map((issue) => (
                        <li key={issue.id} className="list-group-item">
                            <strong>{issue.title}</strong>: {issue.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">No issues found.</p>
            )}
        </div>
    );
};

export default IssueApp;

