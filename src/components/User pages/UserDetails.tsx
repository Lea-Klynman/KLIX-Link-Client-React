import { Avatar, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { User } from "../../types/User";
import userStore from "./userStore";
import { observer } from "mobx-react-lite";


const UserDetails = observer(() => {
    
    if(userStore.user==null) {
        console.log(userStore.user);
        console.log(userStore.getUserId());
        
        
        userStore.fetchUser(userStore.getUserId())
    }
    const user: User =userStore.user
    
    function stringAvatar(name: string) {
        if (name == undefined) {
            name = ' ';
        }
        return {
            sx: {
                bgcolor: "#FFFFFF",
                color:"#2be0dc",
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }
    
    return (

        <Stack direction="row" spacing={2}>
            {!user.name || user.name.trim() === ''?(<> <PersonIcon/></>):(<>
            <Avatar {...stringAvatar(user.name)} />
            </>)}
           
        </Stack>
    );
})
export default UserDetails