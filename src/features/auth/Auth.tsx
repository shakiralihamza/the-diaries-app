import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks";
import {User} from "../../interfaces/user.interface";
import http from "../../services/api";
import {AuthResponse} from "../../services/mirage/routes/user";
import {saveToken, setAuthState} from "./authSlice";
import {setUser} from "./userSlice";
import LoadingButton from '@mui/lab/LoadingButton';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        setLoading(true);
        const path = isLogin ? '/auth/login' : '/auth/signup';
        const data: User = {username, password};
        http
            .post<User, AuthResponse>(path, data)
            .then((res) => {
                if (res) {
                    const {user, token} = res;
                    dispatch(saveToken(token));
                    dispatch(setUser(user));
                    dispatch(setAuthState(true));
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(()=>{
                setLoading(false)
            })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isLogin?'Sign In':'Sign Up'}
                </Typography>
                <Box sx={{mt: 1}}>
                    <TextField
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoComplete={'username'}
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        disabled={loading}
                        margin="normal"
                        required
                        fullWidth
                        sx={{...(isLogin&&{display:'none'})}}
                        label="Email (optional)"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleSubmit}
                    >
                        {isLogin?'Sign In':'Sign Up'}
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs/>
                        <Grid item>
                            <Link
                                onClick={() => setIsLogin(!isLogin)}
                                variant="body2">
                                { isLogin?
                                    "Don't have an account? Sign Up"
                                    :
                                    "Already have an account? Sign In"
                                }
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Auth;
