import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<p>Login Page</p>} />
        <Route path="/signup" element={<p>Signup Page</p>} />
        <Route path="/home" element={<p>Home Page</p>} />
        <Route path="/" element={<p>Home Page</p>} />
        <Route path="/whiteboard" element={<p>Whiteboard Page</p>} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  )
}

export default App
