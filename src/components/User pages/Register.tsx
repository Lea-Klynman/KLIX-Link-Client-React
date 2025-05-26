
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import authStore from './authStore';

import RegisterForm from '../Auth/RegisterForm';
const Register = observer((() => {
    const navigate = useNavigate(); 

 

    const handleRegister = async (userData: {
        name: string
        email: string
        password: string
      }) => {
      
        
       
            const name = userData.name;
            const email = userData.email;
            const password = userData.password;

            const newUser: Partial<User> = {
               
                name,
                email,
                password,
                filesId: [],
                isActive: true

            };
console.log(newUser);

            try {
                await authStore.registerUser(newUser,[Roles.User]);
                navigate('/');
               
            } catch (error) {
                console.error('Register error:', error);
            }
        } 
 

    return <RegisterForm onRegister={handleRegister} />
    

}));


export default Register;