import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react'

interface Props {
    label: string;
    options: any[];
    onChange: (event: any) => void;
    selectedValue?: string;
}

const RadioButtonGroup = ({ label, options, onChange, selectedValue }: Props) => {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ value, label }) => {
                    return (<FormControlLabel value={value} control={<Radio />} label={label} key={value} />);
                })}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonGroup;