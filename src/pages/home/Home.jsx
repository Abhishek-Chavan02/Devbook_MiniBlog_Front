import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => (
  <div className="bg-white shadow p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">My App</h1>
    <div>User Menu</div>
  </div>
);

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex-1 overflow-auto">
          <Outlet /> {/* Nested pages like Profile will render here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
