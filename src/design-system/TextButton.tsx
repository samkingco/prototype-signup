import React from "react";
import styled, { ThemeProp, css } from "./styled";

interface TextButtonStyleProps {
  isDestructive?: boolean;
  size?: 1 | 2;
}

const textButtonStyles = ({
  theme,
  ...props
}: ThemeProp & TextButtonStyleProps) => css`
  width: max-content;
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  color: ${theme.colors.blue70};
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes[2]};
  text-align: left;
  text-decoration: none;
  transition: color 200ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  outline: none;
  ${props.size === 1 &&
  css`
    font-size: ${theme.fontSizes[1]};
  `}
  &:hover:not(:disabled) {
    color: ${theme.colors.blue60};
  }
  &:focus:not(:disabled) {
    border-radius: ${theme.misc.borderRadius};
    box-shadow: ${theme.misc.focusRingShadow} ${theme.colors.blue10};
    background: ${theme.colors.blue10};
  }
  ${props.isDestructive &&
  css`
    color: ${theme.colors.red70};
    &:hover:not(:disabled) {
      color: ${theme.colors.red60};
    }
    &:focus:not(:disabled) {
      box-shadow: ${theme.misc.focusRingShadow} ${theme.colors.red10};
      background: ${theme.colors.red10};
    }
  `}
  &:disabled {
    color: ${theme.colors.gray70};
    cursor: not-allowed;
  }
`;

interface Props {
  className?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  isDestructive?: boolean;
  shouldSubmit?: boolean;
  size?: 1 | 2;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled.button<TextButtonStyleProps>`
  ${textButtonStyles}
`;

export const TextButton = ({
  className,
  children,
  isDisabled = false,
  isDestructive = false,
  shouldSubmit = false,
  size = 2,
  onClick,
}: Props) => {
  return (
    <StyledButton
      className={className}
      type={shouldSubmit ? "submit" : "button"}
      onClick={onClick}
      disabled={isDisabled}
      isDestructive={isDestructive}
      size={size}
    >
      {children}
    </StyledButton>
  );
};
