import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/signUp/signUp.jsx';
import Login from '../pages/login/Login.jsx';
import Home from '../pages/home/Home.jsx';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route 
      path="/home" 
      element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } 
    />
  </Routes>
);

export default AppRouter;
