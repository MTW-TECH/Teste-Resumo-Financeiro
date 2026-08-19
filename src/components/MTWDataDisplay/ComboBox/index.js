import { Autocomplete, TextField } from '@mui/material';
// import InputMask from 'react-input-mask';

function ComboBox({
  options,
  defaultValue,
  value,
  setValue,
  label,
  optionsLabel,
  isOptionEqualToValue,
  sx,
  size,
  disabled,
  autoHighlight
}) {
  return (
    <Autocomplete
      disabled={disabled}
      disablePortal
      value={value}
      options={options}
      onChange={setValue}
      getOptionLabel={optionsLabel}
      defaultValue={defaultValue}
      isOptionEqualToValue={isOptionEqualToValue}
      sx={sx}
      autoHighlight={autoHighlight}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size={size}
          variant="outlined"
          style={{ whiteSpace: 'nowrap' }}
        />
      )}
    />
  );
}

export default ComboBox;
//Documentação:
//value: valor selecionado pelo usuário
//onChange: aciona o setValue
//setValue: valor selecionado pelo usuário
