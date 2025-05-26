// components/common/Button.jsx
import styled, { css } from "styled-components";

const sizeStyles = {
  fixedLarge: css`
    width: 208px;
    height: 58px;
    font-size: 24px;
  `,
  fixedSmall: css`
    width: 135px;
    height: 39px;
    font-size: 16px;
  `,
  responsive: css`
    width: 404px;
    height: 58px;
    font-size: 24px;

    @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      width: 245px;
      height: 53px;
      font-size: 20px;
    }
  `,
};

const variantStyles = {
  red: css`
    background-color: ${({ theme }) => theme.palette.secondary.main};
    color: ${({ theme }) => theme.palette.common.white || "#FFFFFF"};
    font-weight: 600;

    &:hover {
      background-color: ${({ theme }) => theme.palette.error.dark || "#e55f7f"};
    }
  `,
  whiteBold: css`
    background-color: ${({ theme }) => theme.palette.common.white || "#FFFFFF"};
    color: ${({ theme }) => theme.palette.common.black || "#000000"};
    font-weight: 600;

    &:hover {
      background-color: ${({ theme }) => theme.palette.grey[200]};
    }
  `,
  whiteRegular: css`
    background-color: ${({ theme }) => theme.palette.common.white || "#FFFFFF"};
    color: ${({ theme }) => theme.palette.common.black || "#000000"};
    font-weight: 400;

    &:hover {
      background-color: ${({ theme }) => theme.palette.grey[200]};
    }
  `,
  grey: css`
    background-color: ${({ theme }) => theme.palette.grey[300]};
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 400;

    &:hover {
      background-color: ${({ theme }) => theme.palette.grey[400]};
    }
  `,
  greenBold: css`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.common.white || "#FFFFFF"};
    font-weight: 600;

    &:hover {
      background-color: ${({ theme }) =>
        theme.palette.primary.dark || "#16A480"};
    }
  `,
};

const shapeStyles = {
  round: css`
    border-radius: 99px;
  `,
  square: css`
    border-radius: 4px;
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  text-align: center;
  letter-spacing: -0.06em;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${({ size }) => sizeStyles[size]};
  ${({ variant }) => variantStyles[variant]};
  ${({ shape }) => shapeStyles[shape]};
`;

const Button = ({ children, size, variant, shape = "square", ...rest }) => {
  return (
    <StyledButton size={size} variant={variant} shape={shape} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
