import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

const SelectInput = ({ label, name, field, items, errors }) => {
    return (
        <>
            <FormControl>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Select
                    id={name}
                    error={errors[name]}
                    label={label}
                    {...field}
                >
                    {items.map(item => <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>)}
                </Select>
            </FormControl>
            {(errors[name] && errors[name].message != "") && <p role="alert">{errors[name].message}</p>}
        </>
    )
}

export default SelectInput;