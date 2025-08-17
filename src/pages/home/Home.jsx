import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Header = ({ userInfo }) => (
  <div className="bg-white shadow p-4 flex justify-between items-center flex-shrink-0">
    <h1 className="text-xl font-bold">DevBook - Mini Blog App</h1>
    <div>{userInfo?.firstname + " " + userInfo?.lastname}</div>
  </div>
);

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header userInfo={userInfo} />
        {/* Outlet area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Home;
