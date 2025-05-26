import TextField from "@mui/material/TextField";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  width: 100%;

  & .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.common.white};
  }

  & .MuiInputBase-input {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    letter-spacing: -0.06em;
    color: ${({ theme }) => theme.palette.common.black};
    font-size: 20px;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      font-size: 24px;
    }
  }

  & .MuiInputLabel-root {
    font-size: 18px;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    letter-spacing: -0.06em;
    color: ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.common.white};
    padding: 8px;
    border-radius: 4px;
    transform: translate(14px, 10px) scale(1);
    transition: all 0.2s ease;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      font-size: 22px;
    }
  }

  & .MuiInputLabel-shrink {
    transform: translate(14px, -6px) scale(0.75);
    background-color: ${({ theme }) => theme.palette.common.white};
    padding: 0 10px;
    border-radius: 12px;
    line-height: 1.4;
    transition: all 0.2s ease;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.grey[300]};
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <StyledTextField
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error || helperText}
    />
  );
};

export default InputField;
