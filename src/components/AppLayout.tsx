import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { Spa } from "@mui/icons-material";

export default function appLayout() {
  return (
    <>
     <AppBar>

<Container maxWidth="xl">
        <Toolbar disableGutters>
            <Spa sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,color:"#ED3D48"}} />
            <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu"
                sx={{  mr: 2,  display: { xs: 'flex', md: 'none' },  fontFamily: 'monospace',
                    fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                }} > LR
            </Typography>    
        <NavBar />               
            <Spa sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component="a" href="#app-bar-with-responsive-menu"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1, fontFamily: 'cursive', fontWeight: 700,
                    letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                }} > LallyReecipies
            </Typography>
            
        
        
    </Toolbar>
</Container>
</AppBar > 

<Box component="div" sx={{ minHeight: 'calc(100vh - 64px - 200px)', paddingTop: '50px', overflowX: 'hidden', width: '100%' ,paddingBottom:'20px'}}>
        <Outlet/>
            </Box>
                </>
  )
}
