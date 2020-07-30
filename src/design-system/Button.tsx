import React from "react";
import styled, { ThemeProp, css } from "./styled";
import { LoadingIndicator } from "./LoadingIndicator";

export interface ButtonStyleProps {
  variant: "primary" | "secondary";
  fillType: "min-content" | "full-width";
  isLoading?: boolean;
  isDisabled?: boolean;
  isDestructive?: boolean;
}

export const buttonStyles = ({
  theme,
  ...props
}: ThemeProp & ButtonStyleProps) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  min-width: 100px;
  width: ${props.fillType === "min-content" ? "max-content" : "100%"};
  padding: ${theme.space[2]} ${theme.space[3]};
  border-radius: ${theme.misc.borderRadius};
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes[2]};
  line-height: ${theme.fontSizes[3]};
  text-decoration: none;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  ${
    props.variant === "primary" &&
    (props.isDestructive
      ? css`
          color: ${theme.colors.white};
          background: ${theme.colors.red60};
          &:hover {
            color: ${theme.colors.white};
            background: ${theme.colors.red70};
          }
          &:focus:not(:hover) {
            background: ${theme.colors.red60};
            box-shadow: ${theme.misc.focusRingShadow} ${theme.colors.red20};
          }
        `
      : css`
          color: ${theme.colors.green90};
          background: ${theme.colors.green40};
          &:hover {
            background: ${theme.colors.green30};
          }
          &:focus:not(:hover) {
            background: ${theme.colors.green40};
            box-shadow: ${theme.misc.focusRingShadow} ${theme.colors.green20};
          }
        `)
  }
  ${
    props.variant === "secondary" &&
    (props.isDestructive
      ? css`
          color: ${theme.colors.red70};
          background: ${theme.colors.red10};
          &:hover {
            color: ${theme.colors.red80};
            background: ${theme.colors.red20};
          }
          &:focus:not(:hover) {
            background: ${theme.colors.red10};
            box-shadow: ${theme.misc.focusRingShadow} ${theme.colors.red20};
          }
        `
      : css`
          color: ${theme.colors.purple70};
          background: ${theme.colors.purple10};
          &:hover {
            color: ${theme.colors.purple80};
            background: ${theme.colors.purple20};
          }
          &:focus:not(:hover) {
            background: ${theme.colors.purple10};
            box-shadow: ${theme.misc.focusRingShadow} ${theme.colors.purple20};
          }
        `)
  }
  ${
    (props.isDisabled || props.isLoading) &&
    css`
      &,
      &:hover,
      &:focus {
        cursor: not-allowed;
        background: ${theme.colors.gray20};
        color: ${theme.colors.gray70};
      }
    `
  }
  ${
    props.isLoading &&
    css`
      &,
      &:hover,
      &:focus {
        color: transparent;
      }
    `
  }
`;

interface Props {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fillType?: "min-content" | "full-width";
  isLoading?: boolean;
  isDisabled?: boolean;
  isDestructive?: boolean;
  shouldSubmit?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  margin?: string;
}

const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonStyles}
`;

const LoadingIndicatorWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = ({
  className,
  children,
  variant = "primary",
  fillType = "min-content",
  isLoading = false,
  isDisabled = false,
  isDestructive = false,
  shouldSubmit = false,
  onClick,
}: Props) => {
  return (
    <StyledButton
      className={className}
      variant={variant}
      fillType={fillType}
      type={shouldSubmit ? "submit" : "button"}
      onClick={onClick}
      disabled={Boolean(isLoading || isDisabled)}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isDestructive={isDestructive}
    >
      {children}
      {isLoading && (
        <LoadingIndicatorWrapper>
          <LoadingIndicator />
        </LoadingIndicatorWrapper>
      )}
    </StyledButton>
  );
};
