import React, { useRef, useState } from 'react';
import { Button, TextField, Grid2 as Grid, Box, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, IconButton } from '@mui/material';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';
import { observer } from 'mobx-react-lite';
import userStore from './userStore';
import { Link, useNavigate } from 'react-router';
import authStore from './authStore';
import { Eye, EyeOff } from 'lucide-react';
import InfoTooltip from '../Massages/InfoTooltip';
const Register = observer((() => {
    const navigate = useNavigate(); 

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alertInfo, setAlertInfo] = useState<{ severity: 'success' | 'error' | 'warning' | 'info', message: string } | null>(null);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [inputCode, setInputCode] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
      }
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const sendVerificationCode = (email: string) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        const subject=`Verify your email for KLIX-Link ${code}`
        const body=`Hello, ${nameRef.current?.value}. Your verification code for KLIX-Link is ${verificationCode}.\n Please use it to complete your registration process.`
        console.log(`Verification code sent to ${email}: ${verificationCode}`);
        setIsDialogOpen(true);
        userStore.sendEmail(email, subject, body);
    };

    const validatePasswordStrength = (password: string) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Moderate';
        return 'Strong';
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (name && email && password) {
            if (!validateEmail(email)) {
                setAlertInfo({ severity: 'warning', message: 'Please enter a valid email address.' });
                return;
            }

            const passwordStrength = validatePasswordStrength(password);
            if (passwordStrength === 'Weak') {
                setAlertInfo({ severity: 'warning', message: 'Password is too weak. Please choose a stronger password.' });
                return;
            }

            sendVerificationCode(email);
        } else {
            setAlertInfo({ severity: 'warning', message: 'Please fill in all fields.' });
        }
    };

    const handleVerifyCode = async () => {
        if (inputCode== verificationCode) {
            const name = nameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            const newUser: Partial<User> = {
               
                name,
                email,
                password,
                filesId: [],
                isActive: true

            };

            try {
                await authStore.registerUser(newUser,[Roles.User]);
                navigate('/');
                setAlertInfo({ severity: 'success', message: 'Successfully registered!' });
                setIsDialogOpen(false);
            } catch (error) {
                setAlertInfo({ severity: 'error', message: 'An unexpected error occurred. Please try again later.' });
                console.error('Register error:', error);
            }
        } else {
            setAlertInfo({ severity: 'error', message: 'Verification code is incorrect.' });
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            {alertInfo && (
                <Alert severity={alertInfo.severity} onClose={() => setAlertInfo(null)} sx={{ mb: 2 }}>
                    {alertInfo.message}
                </Alert>
            )}
            <form onSubmit={handleRegister}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField label="Name" inputRef={nameRef} fullWidth required />
                    </Grid>
                    <Grid size={12}>
                        <TextField label="Email" inputRef={emailRef} fullWidth required />
                    </Grid>
                    <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              inputRef={passwordRef}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
                    <Grid size={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </Grid>
                    <Button type="button" component={Link} to='/login'> Have an account? Sign up</Button>

                </Grid>
            </form>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Verify Your Email</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: 2,display: 'flex', alignItems: 'space-around' }}>
                        Please enter the verification code sent to your email.
                        <InfoTooltip
  info="The verification code email might land in your spam folder by mistake.
Please check your spam/junk folder if you don’t see it within a few minutes.
"
  icon="!"
/>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Verification Code"
                        fullWidth
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleVerifyCode} color="primary">
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}));


export default Register;