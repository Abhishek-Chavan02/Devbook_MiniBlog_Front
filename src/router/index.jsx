import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/signUp/SignUp.jsx';
import Login from '../pages/login/Login.jsx';
import Home from '../pages/home/Home.jsx';
import Profile from '../pages/home/Profile.jsx';
import PrivateRoute from './PrivateRoute';
import UserTable from '../pages/home/UserTable.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    {/* Private layout */}
<Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
  <Route path="profile" element={<Profile />} />
  <Route path="user_list" element={<UserTable />} />
</Route>

  </Routes>
);

export default AppRouter;
