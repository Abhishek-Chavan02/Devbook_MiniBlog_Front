import { Routes, Route } from 'react-router-dom';

import Login from '../pages/login/Login.jsx';
import Home from '../pages/home/Home.jsx';
import Profile from '../pages/home/Profile.jsx';
import PrivateRoute from './PrivateRoute';
import Signup from '../pages/signUp/signUp.jsx';
import UserManagement from '../pages/home/UserManagement.jsx'; 
import Blog from '../pages/Blog/index.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    {/* Private layout */}
    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
      <Route path="profile" element={<Profile />} />
      <Route path="user_list" element={<UserManagement />} />
      <Route path="blog" element={<Blog />} /> 
    </Route>
  </Routes>
);

export default AppRouter;
