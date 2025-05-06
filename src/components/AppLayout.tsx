import { AppBar, Box, Container, IconButton, Toolbar,  Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";

import userStore from "./User pages/userStore";
import { useEffect } from "react";
import EmailIcon from "./Massages/EmailIcon";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function appLayout() {
const navigate=useNavigate();
  useEffect(() => {
    if (!userStore.token) {
      navigate('/login');
    }
  }, [userStore.token]);
 
  return (
    <>
     <AppBar style={{flexGrow: 1,display:'flex',flexDirection:'row-reverse'}}>

<Container maxWidth="xl" style={{display:'flex',flexDirection:'row-reverse'}}>
        <Toolbar style={{display:'flex',flexDirection:'row-reverse'}}>
        <img
          src={logo}
          alt="KLIX-Link Logo"
          style={{ height: "55px", marginRight: "5px" }}
        />
        <Typography variant="h4"  fontFamily="sans-serif"align="right"  marginRight="10px" sx={{ flexGrow: 1 }}>
          KLIX-Link
        </Typography>  
            
            
            
        
        
    </Toolbar>
</Container>
</AppBar > 
<NavBar />
<Box component="div" sx={{ minHeight: 'calc(100vh - 64px - 200px)', paddingTop: '50px', overflowX: 'hidden', width: '100%' ,paddingBottom:'20px'}}>
        <Outlet/>
        <EmailIcon/>
            </Box>
            <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            fontFamily: "cursive",
            color: "#2c3e50",
          }}
        >
          © 2025 Lea Klynman. All rights reserved
        </Typography>
        <IconButton
          href="https://github.com/Lea-Klynman"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 1 }}
        >
          <GitHubIcon sx={{ color: "#3ec1c1", fontSize: 35 }} />
        </IconButton>
      </Box>
                </>
  )
}
