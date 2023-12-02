import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

const SelectInput = ({ label, name, field, items }) => {
    return (
        <FormControl>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select
                id={name}
                label={label}
                {...field}
            >
                {items.map(item => <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default SelectInput;