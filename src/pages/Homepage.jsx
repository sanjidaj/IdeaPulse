import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 p-8">
        <h1>Welcome to IdeaPulse</h1>
      </div>
    </div>
  );
};

export default Homepage;