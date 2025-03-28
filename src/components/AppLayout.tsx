import { AppBar, Box, Container, Toolbar,  Typography } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import logo from "../assets/logo.png";

import userStore from "./User pages/userStore";
export default function appLayout() {
 
  return (
    <>
     <AppBar>

<Container maxWidth="xl">
        {/* <Toolbar disableGutters> */}
        <Toolbar>
        <img
          src={logo}
          alt="KLIX-Link Logo"
          style={{ height: "55px", marginRight: "5px" }}
        />
        <Typography variant="h4"  fontFamily="cursive"align="left"  marginLeft="10px" sx={{ flexGrow: 1 }}>
          KLIX-Link
        </Typography>  
       {userStore.token&& <NavBar /> }              
            
            
            
        
        
    </Toolbar>
</Container>
</AppBar > 

<Box component="div" sx={{ minHeight: 'calc(100vh - 64px - 200px)', paddingTop: '50px', overflowX: 'hidden', width: '100%' ,paddingBottom:'20px'}}>
        <Outlet/>
            </Box>
                </>
  )
}
