import { Link, useNavigate } from "react-router-dom";
import {  IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Box, Menu, MenuItem, Typography } from "@mui/material";
import { Menu as MenuIcon, FileUpload, FolderShared, Description, Dashboard, Info } from "@mui/icons-material";
import React from "react";
import userStore from "./User pages/userStore";
import UserDetails from "./User pages/UserDetails";
import { observer } from "mobx-react-lite";
import { CloudDownload } from "lucide-react";

const drawerWidth = 60; 
const expandedDrawerWidth = 240; 

const Sidebar = observer(({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <Drawer
      sx={{
        width: open ? expandedDrawerWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? expandedDrawerWidth : drawerWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#2C3E50",
          color: "#FFFFFF"
        }
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      <Box sx={{ flexGrow: 0, display:'flex',}}>
                    
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                           <UserDetails />
                        </IconButton>
                    </Tooltip>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={() => {
                              userStore.logout();
                              navigate('/login');
                            }}>Log Out</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
      <IconButton onClick={onToggle} sx={{ color: "#FFFFFF", margin: 1 }}>
        <MenuIcon />
      </IconButton>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/upload'>
            <ListItemIcon sx={{ color: "#FFFFFF" }}><FileUpload /></ListItemIcon>
            {open && <ListItemText primary="Upload File" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/filelist'>
            <ListItemIcon sx={{ color: "#FFFFFF" }}><FolderShared /></ListItemIcon>
            {open && <ListItemText primary="My Files" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/view-file'>
            <ListItemIcon sx={{ color: "#FFFFFF" }}><Description /></ListItemIcon>
            {open && <ListItemText primary="Shared Files" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/downloadDeskTop'>
            <ListItemIcon sx={{ color: "#FFFFFF" }}><CloudDownload /></ListItemIcon>
            {open && <ListItemText primary="KLIX-Link-Desktop" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/about'>
            <ListItemIcon sx={{ color: "#FFFFFF" }}><Info /></ListItemIcon>
            {open && <ListItemText primary="About" />}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='/'>
            <ListItemIcon sx={{ color: "#FFFFFF" }}><Dashboard /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );

});


export default Sidebar;