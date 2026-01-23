import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// components
// test 1 
// test 2
// test 3
import Login from './components/Accounts/Login/Login'
import Signup from './components/Accounts/Signup/Signup'
import Home from './components/Home/Home'
import WorkSpace from './components/WorkSpace/WorkSpace'

// hooks
import { useIsAuth} from './components/stores/AccountsStore/AccountsStore'

function App() {
  
  // hook init
  const isAuth = useIsAuth()




  return (
    <Router>
      <Routes>

        {/* Redirect guests (not logged in) to login/signup */}
        {!isAuth && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Authenticated users */}
        {isAuth && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/whiteboard" element={<p>Whiteboard Page</p>} />
            <Route path='/workspace' element={<WorkSpace />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<p>404 Not Found</p>} />
          </>
        )}
      </Routes>
    </Router>
  )
  
}

export default App
