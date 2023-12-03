import { InputLabel, FormControl, OutlinedInput } from '@mui/material';

const Input = ({ label, name, field, type, errors }) => {
    return (
        <>
            <FormControl variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <OutlinedInput
                    id={name}
                    error={errors[name]}
                    type={type}
                    label={label}
                    {...field}
                />
            </FormControl>
            {(errors[name] && errors[name].message != "") && <p role="alert">{errors[name].message}</p>}

        </>
    )
}

export default Input;