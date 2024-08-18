import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const IssueApp = () => {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({ title: '', description: '' });

    const fetchIssues = () => {
        axios.get('/api/issues')
            .then(response => setIssues(response.data))
            .catch(error => console.error(error));
    };

    const createIssue = () => {
        axios.post('/api/issues', newIssue)
            .then(() => fetchIssues())
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Issue Tracker</h1>
            <form onSubmit={e => { e.preventDefault(); createIssue(); }}>
                <TextField
                    label="Title"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Create Issue
                </Button>
            </form>
            {issues.map(issue => (
                <Card key={issue.id} sx={{ marginTop: '20px' }}>
                    <CardContent>
                        <Typography variant="h5">{issue.title}</Typography>
                        <Typography variant="body2">{issue.description}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default IssueApp;
