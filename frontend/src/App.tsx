import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

// components
import Login from './components/Accounts/Login/Login'
import Signup from './components/Accounts/Signup/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<p>Home Page</p>} />
        <Route path="/" element={<p>Home Page</p>} />
        <Route path="/whiteboard" element={<p>Whiteboard Page</p>} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  )
}

export default App
