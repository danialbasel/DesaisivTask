import { useState, useContext } from 'react';
import { InputLabel, FormControl, InputAdornment, IconButton, OutlinedInput, Checkbox, Button, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from "react-hook-form"
import Styles from './login.module.css';
import Auth from '../../services/auth';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';
import { NavigateTo } from '../../routes';

const Login = () => {
    const { setAuthenticated } = useContext(AuthContext);
    const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const Navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = (data) => {
        Auth.SignIn(data).then(() => {
            setAuthenticated(true);
            NavigateTo(Navigate, '/formPage');
        }).catch(err => {
            alert(err)
        })
    }
    return (
        <div className={Styles.fromWrapper} >
            <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={Styles.formHeader}>Sign in</h1>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <FormControl variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            label="Email"
                            {...field}
                        />
                    </FormControl>}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) =>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                {...field}
                            />
                        </FormControl>}
                />
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => <FormControlLabel
                        value="rememberMe"
                        control={<Checkbox />}
                        label="Remember Me"
                        labelPlacement="end"
                        {...field}
                    />}
                />
                <Button size='large' type='submit' variant="contained">Login</Button>
            </form>
        </div>
    )

}

export default Login;