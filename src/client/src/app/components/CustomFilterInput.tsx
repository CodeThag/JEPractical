import { FormControl, TextField } from '@mui/material';
interface Props {
    label: string;
    onChange: (event: any) => void;
    defaultValue?: number;
}

const CustomFilterInput = ({ label, onChange, defaultValue }: Props) => {

    return (
        <FormControl>
            <TextField
                id="outlined-number"
                label={label}
                type="number"
                placeholder="Search year"
                onChange={onChange}
                value={defaultValue}
            />
        </FormControl >
    )
}

export default CustomFilterInput;