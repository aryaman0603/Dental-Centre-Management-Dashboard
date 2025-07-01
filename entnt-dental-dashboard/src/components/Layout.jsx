import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
