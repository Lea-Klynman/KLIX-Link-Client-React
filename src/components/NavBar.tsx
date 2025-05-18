
import { useState } from "react";
import Sidebar from "./SideBar";



const NavBar = () => {

const [openSidebar, setOpenSidebar] = useState(false);


  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
    
      <Sidebar open={openSidebar} onToggle={handleToggleSidebar} />

     
    </>
  );
};
export default NavBar;
