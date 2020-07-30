import React from "react";
import styled from "./styled";
import { Text } from "./Text";

type ValidationTextType = "input" | "selectionControl" | "text";

interface Props {
  validationFor?: ValidationTextType;
  children: React.ReactNode;
}

const StyledValidationText = styled(Text)<{ leftSpace?: number }>`
  margin-top: ${(p) => p.theme.space[1]};
  margin-left: ${(p) => (p.leftSpace ? `${p.leftSpace}px` : 0)};
`;

const leftSpaceMap: { [key in ValidationTextType]: number } = {
  input: 12,
  selectionControl: 36,
  text: 0,
};

export const ValidationText = ({
  validationFor = "input",
  children,
}: Props) => {
  let leftSpace = leftSpaceMap[validationFor];
  return (
    <StyledValidationText size={1} color="red70" leftSpace={leftSpace}>
      {children}
    </StyledValidationText>
  );
};
