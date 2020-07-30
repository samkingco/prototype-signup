import React from "react";
import styled from "./styled";
import { Text } from "./Text";

type HelpTextType = "input" | "selectionControl" | "text";

interface Props {
  helpFor?: HelpTextType;
  children: React.ReactNode;
}

const StyledHelpText = styled(Text)<{ leftSpace?: number }>`
  margin-top: ${(p) => p.theme.space[1]};
  margin-left: ${(p) => (p.leftSpace ? `${p.leftSpace}px` : 0)};
`;

const leftSpaceMap: { [key in HelpTextType]: number } = {
  input: 12,
  selectionControl: 36,
  text: 0,
};

export const HelpText = ({ helpFor = "input", children }: Props) => {
  let leftSpace = leftSpaceMap[helpFor];
  return (
    <StyledHelpText size={1} color="gray70" leftSpace={leftSpace}>
      {children}
    </StyledHelpText>
  );
};
