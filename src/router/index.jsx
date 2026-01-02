import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/login/Login.jsx';
import Home from '../pages/home/Home.jsx';
import Profile from '../pages/home/Profile.jsx';
import PrivateRoute from './PrivateRoute';
import Signup from '../pages/signUp/SignUp.jsx';
import UserManagement from '../pages/home/UserManagement.jsx'; 
import Blog from '../pages/Blog/index.jsx';
import HomeContent from '../pages/home/HomeContetnt.jsx';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Routes>
      <Route
        path="/"
        element={userInfo ? <Navigate to="/home" replace /> : <Signup />}
      />
      <Route
        path="/login"
        element={userInfo ? <Navigate to="/home" replace /> : <Login />}
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route index element={<HomeContent />} />
        <Route path="profile" element={<Profile />} />
        <Route path="user_list" element={<UserManagement />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  );
};


export default AppRouter;
