import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationForm from './pages/RegistrationForm';
import DashboardPage from './pages/DashboardPage';
import AddCallPage from './pages/AddCallPage';
import UpdateCallPage from './pages/UpdateCallPage';
import TicketListPage from './pages/TicketListPage';
import TicketCommentsList from './pages/TicketCommentsList';
import AddTicket from './pages/AddTicket';
import UpdateTicketPage from './pages/UpdateTicketPage';
import AgentsListPage from './pages/AgentsListPage';
import ViewAgent from './pages/ViewAgent';
import { isTokenExpired, logout } from './utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar'; 

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      logout();
      navigate('/');
    }
  }, [navigate]);

  // Define a function to check if current route is LoginPage or RegistrationForm
  const shouldRenderNavigationBar = () => {
    return !['/register', '/'].includes(location.pathname);
  };

  return (
    <>
      {shouldRenderNavigationBar() && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-call" element={<AddCallPage />} />
        <Route path="/update-call/:id" element={<UpdateCallPage />} />
        <Route path="/call/:callId/tickets" element={<TicketListPage />} />
        <Route path="/tickets/:ticketId/comments" element={<TicketCommentsList />} />
        <Route path="/call/:callId/add-ticket/:agentId" element={<AddTicket />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/update-ticket/:id" element={<UpdateTicketPage />} />
        <Route path="/agents" element={<AgentsListPage />} />
        <Route path="/agents/:agentId" element={<ViewAgent />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
