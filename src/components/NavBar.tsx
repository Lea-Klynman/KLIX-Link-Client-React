// import { Link } from "react-router-dom";
// import { Box, Button, Menu, MenuItem } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import React from "react";

// const NavBar = () => {
//     const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

//     const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElNav(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     return (<>
//         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <Button
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//             >
//                 <MenuIcon sx={{ mr: 1, color: "#ED3D48", backgroundColor: "#FFFFFF" }} />
//             </Button>
//             <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//                 keepMounted
//                 transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//             >
//                 <MenuItem onClick={handleCloseNavMenu}>
//                     <Button sx={{ color: "#FFFFFF" }} component={Link} to='/upload'>UPLOAD</Button>
//                 </MenuItem>
//                 <MenuItem onClick={handleCloseNavMenu}>
//                     <Button sx={{ color: "#FFFFFF" }} component={Link} to='/filelist'>filelist</Button>
//                 </MenuItem>
//                 <MenuItem onClick={handleCloseNavMenu}>
//                     <Button sx={{ color: "#FFFFFF" }} component={Link} to='/view-file'>view-file</Button>
//                 </MenuItem>
//                 <MenuItem onClick={handleCloseNavMenu}>
//                     <Button sx={{ color: "#FFFFFF" }} component={Link} to=''>Dashboard</Button>
//                 </MenuItem><MenuItem onClick={handleCloseNavMenu}>
//                     <Button sx={{ color: "#FFFFFF" }} component={Link} to='/about'>About</Button>
//                 </MenuItem>
//             </Menu>
//         </Box>
//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             <Button sx={{ color: "#FFFFFF" }} component={Link} to='/upload'>Upload a file</Button>
//             <Button sx={{ color: "#FFFFFF" }} component={Link} to='/filelist'>My Files</Button>
//             <Button sx={{ color: "#FFFFFF" }} component={Link} to='/view-file'>Shared files</Button>
//             <Button sx={{ color: "#FFFFFF" }} component={Link} to='/about'>About</Button>
//             <Button sx={{ color: "#FFFFFF" }} component={Link} to=''>Dashboard</Button>
//         </Box>
//     </>);
// };

// export default NavBar;

import { Link } from "react-router-dom";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";
import Sidebar from "./SideBar";
import {  MoreVert } from "@mui/icons-material";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <Button
          size="large"
          aria-label="open menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon sx={{ mr: 1, color: "#ED3D48", backgroundColor: "#FFFFFF" }} />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/upload'>Upload</Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/filelist'>My Files</Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/view-file'>Shared Files</Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/about'>About</Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/'>Dashboard</Button>
          </MenuItem>
        </Menu>
      </Box>

      {/* NavBar for larger screens */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button sx={{ color: "#FFFFFF" }} component={Link} to='/'>Dashboard</Button>
        <Button sx={{ color: "#FFFFFF" }} component={Link} to='/about'>About</Button>
        <IconButton sx={{ color: "#579fba", position: "absolute",  right: 0, width: 30, top:300 }}  onClick={handleToggleSidebar}>
            <MoreVert sx={{ fontSize: 80 }}/>
          </IconButton>
         </Box>

      {/* Drawer sidebar */}
      <Sidebar open={openSidebar} onClose={handleToggleSidebar} />
    </>
  );
};

export default NavBar;
