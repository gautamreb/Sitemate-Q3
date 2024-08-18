import logo from './logo.svg';
import './App.css';
import IssueApp from './components/IssueApp';

function App() {
    return (
        <div className="App">
            <h1>Welcome to Issue Tracker</h1>
            <IssueApp />  {/* Use the component */}
        </div>
    );
}

export default App;
