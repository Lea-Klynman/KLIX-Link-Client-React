
import { observer } from 'mobx-react-lite';
import LoginForm from '../Auth/LoginForm';
import { useNavigate } from 'react-router';
import authStore from './authStore';
import userStore from './userStore';
import { Roles } from '../../types/Roles';

const Login = observer(() => {


    const navigate = useNavigate();
 

        const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePasswordStrength = (password: string) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Moderate';
        return 'Strong';
    };
const handleLogin = async (email: string, password: string) => {
          
    
            if (email && password) {
                if (!validateEmail(email)) {
                    return;
                }
    
                const passwordStrength = validatePasswordStrength(password);
                if (passwordStrength === 'Weak') {
                    return;
                }
    
                try {
                  await  authStore.loginUser(email, password, [Roles.User]).then(() => {
    
                        console.log(userStore.user.id, userStore.token);
                        navigate('/');
                    });
    
                } catch (error) {
                    console.error('Login error:', error);
                }
            } else {
                return;}
        };

return (<><LoginForm onLogin={handleLogin} /></>)
})
export default Login;
