import { Autocomplete, TextField } from '@mui/material';
import PopperCustom from '../PopperCustom';
import CircularProgress from '@mui/material/CircularProgress';

function CustomComboBox({
  options,
  defaultValue,
  value,
  setValue,
  label,
  optionsLabel,
  isOptionEqualToValue,
  sx,
  size,
  innerSx,
  disabled,
  colorSelectedOption
}) {
  return (
    <>
      {options?.length === 0 ? (
        <CircularProgress />
      ) : (
        <Autocomplete
          disabled={disabled}
          disablePortal
          disableClearable
          value={value}
          options={options}
          onChange={setValue}
          getOptionLabel={optionsLabel}
          defaultValue={defaultValue}
          isOptionEqualToValue={isOptionEqualToValue}
          sx={sx}
          size={size}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              sx={innerSx}
            />
          )}
          PopperComponent={PopperCustom}
          renderOption={
            colorSelectedOption &&
            ((props, option) => (
              <li
                {...props}
                style={{
                  backgroundColor:
                    isOptionEqualToValue(option, value) && '#A646DC',
                  color: isOptionEqualToValue(option, value) && '#fff'
                }}
              >
                {optionsLabel(option)}
              </li>
            ))
          }
        />
      )}
    </>
  );
}

export default CustomComboBox;
