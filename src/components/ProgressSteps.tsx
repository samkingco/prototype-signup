import React from "react";
import { Text } from "../design-system/Text";
import { Icon } from "../design-system/Icon";
import styled from "../design-system/styled";

interface Props {
  currentStep: number;
  isCurrentStepDone?: boolean;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: ${(p) => p.theme.space[4]};

  @media only screen and (min-width: 556px) {
    grid-template-columns: repeat(3, max-content);
  }
`;

const Step = styled.div<{ isActive?: boolean }>`
  display: ${(p) => (p.isActive ? "grid" : "none")};
  grid-template-columns: 24px 1fr;
  grid-gap: ${(p) => p.theme.space[1]};

  @media only screen and (min-width: 556px) {
    display: grid;
  }
`;

const StepNumber = styled(Text)<{ isActive?: boolean }>`
  font-size: ${(p) => p.theme.fontSizes[1]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  color: ${(p) =>
    p.isActive ? p.theme.colors.purple70 : p.theme.colors.gray70};
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.purple10 : p.theme.colors.gray10};
  width: ${(p) => p.theme.space[4]};
  height: ${(p) => p.theme.space[4]};
  border-radius: 50%;
  text-align: center;
  line-height: ${(p) => p.theme.space[4]};
`;

const StepTotal = styled(Text)`
  @media only screen and (min-width: 556px) {
    display: none;
  }
`;

const steps = ["Create account", "Account security", "NHS details"];

export function ProgressSteps(props: Props) {
  const activeStep = props.currentStep - 1;

  return (
    <Wrapper>
      {steps.map((step, index) => {
        if (
          activeStep > index ||
          (activeStep === index && props.isCurrentStepDone)
        ) {
          return (
            <Step
              key={index}
              isActive={activeStep === index && props.isCurrentStepDone}
            >
              <Icon color="green50">check</Icon>
              <Text color="gray70">{step}</Text>
            </Step>
          );
        }

        if (activeStep === index && !props.isCurrentStepDone) {
          return (
            <Step key={index} isActive={true}>
              <StepNumber isActive={true}>{index + 1}</StepNumber>
              <Text isBold={true}>{step}</Text>
            </Step>
          );
        }

        if (activeStep < index) {
          return (
            <Step key={index}>
              <StepNumber>{index + 1}</StepNumber>
              <Text color="gray70">{step}</Text>
            </Step>
          );
        }

        return null;
      })}
      <StepTotal color="gray70">Step {props.currentStep} of 3</StepTotal>
    </Wrapper>
  );
}
