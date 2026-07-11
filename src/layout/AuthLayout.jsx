import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#B3CFE5] via-[#4A7FA7] to-[#1A3D63]">
      <Outlet/>
    </main>
  );
};

export default AuthLayout;