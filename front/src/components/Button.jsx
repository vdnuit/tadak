// components/common/Button.jsx
import styled, { css } from 'styled-components';

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
  responsiveLarge: css`
    width: 404px;
    height: 58px;
    font-size: 24px;
  `,
  responsiveSmall: css`
    width: 245px;
    height: 53px;
    font-size: 20px;
  `,
};

const variantStyles = {
  red: css`
    background-color: #FC7B95;
    color: white;
    font-weight: 600;
  `,
  whiteBold: css`
    background-color: white;
    color: black;
    font-weight: 600;
  `,
  whiteRegular: css`
    background-color: white;
    color: black;
    font-weight: 400;
  `,
  grey: css`
    background-color: #EFF0F3;
    color: white;
    font-weight: 400;
  `,
  greenBold: css`
    background-color: #50CFB1;
    color: white;
    font-weight: 600;
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

  ${({ size }) => sizeStyles[size]};
  ${({ variant }) => variantStyles[variant]};
  ${({ shape }) => shapeStyles[shape]};
`;

const Button = ({ children, size, variant, shape = 'square', ...rest }) => {
  return (
    <StyledButton size={size} variant={variant} shape={shape} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
