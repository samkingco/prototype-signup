import React from "react";
import { styled } from "./styled";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { ValidationText } from "./ValidationText";
import { HelpText } from "./HelpText";

export interface CheckboxInputProps {
  labelText?: string;
  labelComponent?: React.ReactNode;
  helpMessage?: React.ReactNode;
  validationMessage?: React.ReactNode;
}

interface LabelProps {
  isDisabled: boolean;
  hasLabel: boolean;
}

const Label = styled("label")<LabelProps>`
  position: relative;
  display: grid;
  grid-template-columns: ${(p) =>
    p.hasLabel ? "min-content 1fr" : "min-content"};
  grid-gap: ${(p) => p.theme.space[2]};
  align-items: center;
  cursor: ${(p) => (p.isDisabled ? "default" : "pointer")};
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: ${(p) => p.theme.space[1]} 0;

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const Tick = styled(Icon)`
  font-size: 20px;
`;

const FakeInput = styled.span`
  width: ${(p) => p.theme.space[4]};
  height: ${(p) => p.theme.space[4]};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(p) => p.theme.misc.borderRadius};
  box-shadow: inset 0 0 0 2px ${(p) => p.theme.colors.gray20};
  color: ${(p) => p.theme.colors.white};
  background-color: ${(p) => p.theme.colors.white};

  ${Tick} {
    display: none;
  }

  ${Input}:checked + & {
    background: ${(p) => p.theme.colors.blue60};
    box-shadow: none;
  }

  ${Input}:checked + & ${Tick} {
    display: block;
  }

  ${Input}:disabled + & {
    background: ${(p) => p.theme.colors.gray20};
  }

  ${Input}:disabled:checked + & {
    color: ${(p) => p.theme.colors.gray40};
  }
`;

export type CheckboxProps = CheckboxInputProps &
  Partial<React.HTMLProps<HTMLInputElement>>;

export const Checkbox = React.forwardRef(
  (
    { labelText, labelComponent, as, type, className, ...props }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <Label
          as={labelComponent || labelText ? "label" : "div"}
          isDisabled={!!props.disabled}
          hasLabel={Boolean(labelComponent || labelText)}
          className={className}
        >
          <Input type="checkbox" {...props} ref={ref} />
          <FakeInput>
            <Tick>done</Tick>
          </FakeInput>
          {labelComponent}
          {labelText && <Text>{labelText}</Text>}
        </Label>
        {props.helpMessage && (
          <HelpText helpFor="selectionControl">{props.helpMessage}</HelpText>
        )}
        {props.validationMessage && (
          <ValidationText validationFor="selectionControl">
            {props.validationMessage}
          </ValidationText>
        )}
      </div>
    );
  }
);
