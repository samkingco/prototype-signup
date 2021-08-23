import React from "react";
import { default as MaskedInputComponent } from "react-maskedinput";
import styled, { css } from "./styled";

const StyledInput = styled(MaskedInputComponent)<{ hasLabel: boolean }>`
  border: 2px solid ${(p) => p.theme.colors.gray20};
  border-radius: ${(p) => p.theme.misc.borderRadius};
  padding: ${(p) => p.theme.space[2]};
  font-size: ${(p) => p.theme.fontSizes[2]};
  font-family: ${(p) => p.theme.fonts.body};
  color: ${(p) => p.theme.colors.gray90};
  outline: none;
  width: 100%;

  ::placeholder {
    opacity: 1;
    color: ${(p) => p.theme.colors.gray40};
  }

  &:hover {
    border-color: ${(p) => p.theme.colors.gray40};
  }

  &:focus {
    border-color: ${(p) => p.theme.colors.blue60};
  }

  ${(p) => {
    if (p.hasLabel) {
      return css`
        padding-top: ${(p) => p.theme.space[5]};
      `;
    }
  }}
`;

const Label = styled.label`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: ${(p) => p.theme.fontSizes[1]};
  color: ${(p) => p.theme.colors.gray70};
  padding: ${(p) => p.theme.space[2]} ${(p) => p.theme.space[2]} 0;
  cursor: pointer;

  ${StyledInput}:focus + & {
    color: ${(p) => p.theme.colors.blue70};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

interface TextInputProps {
  name: string;
  mask: string;
  label?: string;
  placeholder?: string;
  placeholderChar?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MaskedInput(props: TextInputProps) {
  return (
    <Wrapper>
      <StyledInput
        {...props}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        hasLabel={Boolean(props.label)}
      />
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
    </Wrapper>
  );
}

// interface TextInputProps2 {
//   name: string;
//   label?: string;
//   mask: string;
//   placeholderChar?: string;
//   helpMessage?: React.ReactNode;
//   validationMessage?: React.ReactNode;
// }

// export const MaskedInput2 = React.forwardRef(
//   (
//     {
//       name,
//       label,
//       validationMessage,
//       helpMessage,
//       as,
//       ...props
//     }: TextInputProps,
//     ref: React.Ref<HTMLInputElement>
//   ) => {
//     return (
//       <Wrapper>
//         <StyledInput
//           {...props}
//           ref={ref}
//           id={name}
//           name={name}
//           hasLabel={Boolean(label)}
//         />
//         {label && <Label htmlFor={name}>{label}</Label>}
//         {validationMessage && (
//           <ValidationText>{validationMessage}</ValidationText>
//         )}
//         {helpMessage && <HelpText>{helpMessage}</HelpText>}
//       </Wrapper>
//     );
//   }
// );
