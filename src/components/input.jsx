import { InputLabel, FormControl, OutlinedInput } from '@mui/material';

const Input = ({ label, name, field, type }) => {
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={name}
                type={type}
                label={label}
                {...field}
            />
        </FormControl>
    )
}

export default Input;