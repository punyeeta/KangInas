import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/Landingpage/LandingPage';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import useAuthStore from './store/AuthStore';
import UserProfilePage from './components/userprofile/UserProfile';

function App() {
    const { checkAuthStatus, hasCheckedAuth } = useAuthStore();
    
    // Check authentication status only once when the app loads
    useEffect(() => {
        if (!hasCheckedAuth) {
            checkAuthStatus();
        }
    }, [checkAuthStatus, hasCheckedAuth]);
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* Remove the duplicate route and use only the protected one */}
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/profile" element={<PrivateRoute element={<UserProfilePage />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;