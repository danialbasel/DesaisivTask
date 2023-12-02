import { useState } from 'react';
import {
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
    OutlinedInput,
    Button,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from "react-hook-form"
import Styles from './login.module.css';

const FormPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = (data) => alert(data);

    return (
        <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => <FormControl variant="outlined">
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <OutlinedInput
                        id="firstName"
                        label="firstName"
                        error={errors.firstName}
                        {...field}
                    />
                </FormControl>}
            />
            {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
            <Controller
                name="middleName"
                control={control}
                render={({ field }) => <FormControl variant="outlined">
                    <InputLabel htmlFor="middleName">Middle Name</InputLabel>
                    <OutlinedInput
                        id="middleName"
                        label="middleName"
                        {...field}
                    />
                </FormControl>}
            />
            <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => <FormControl variant="outlined">
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <OutlinedInput
                        id="lastName"
                        label="lastName"
                        error={errors.lastName}
                        {...field}
                    />
                </FormControl>}
            />
            {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email is required', pattern:
                    {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email"
                    }
                }}
                render={({ field }) => <FormControl variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                        id="email"
                        label="Email"
                        error={errors.email}
                        {...field}
                    />
                </FormControl>}
            />
            {errors.email && <p role="alert">{errors.email.message}</p>}
            <Controller
                name="age"
                control={control}
                rules={{
                    required: 'Age is required', max:
                    {
                        value: 100,
                        message: "maximum age is 100"
                    },
                    min: {
                        value: 18,
                        message: "You must be 18 and over"
                    }
                }}
                render={({ field }) => <FormControl variant="outlined">
                    <InputLabel htmlFor="age">Age</InputLabel>
                    <OutlinedInput
                        id="age"
                        label="age"
                        type="number"
                        error={errors.age}
                        {...field}
                    />
                </FormControl>}
            />
            {errors.age && <p role="alert">{errors.age.message}</p>}
            <Controller
                name="gender"
                control={control}
                rules={{ required: 'Gender is required' }}
                render={({ field }) => <FormControl>
                    <InputLabel htmlFor="gender">Gender *</InputLabel>
                    <Select
                        id="gender"
                        value=''
                        label="Gender *"
                        error={errors.gender}
                        {...field}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='M'>Male</MenuItem>
                        <MenuItem value='F'>Female</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>}
            />
            {errors.gender && <p role="alert">{errors.gender.message}</p>}
            <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
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
                            error={errors.password}
                            {...field}
                        />
                    </FormControl>}
            />
            {errors.password && <p role="alert">{errors.password.message}</p>}
            <Button size='large' type='submit' variant="outlined">Submit</Button>
        </form>
    )

}

export default FormPage;