import { useState } from 'react';

import {
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
    OutlinedInput
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ label, name, field, errors }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <FormControl variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <OutlinedInput
                    id={name}
                    error={errors[name]}
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
                    label={label}
                    value={value}
                    onChange={handleChange}
                    {...field}
                />
            </FormControl>
            {(errors[name] && errors[name].message != "") && <p role="alert">{errors[name].message}</p>}
        </>
    )
}

export default PasswordInput;