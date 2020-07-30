import React from "react";
import styled, { css } from "./styled";
import { Radio } from "./Radio";
import { Checkbox } from "./Checkbox";
import { Text } from "./Text";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[2]};
`;

const DualOptionWrapper = styled.div`
  overflow: hidden;
  border-radius: ${(p) => p.theme.misc.borderRadius};
  border: 2px solid ${(p) => p.theme.colors.gray20};

  @media only screen and (min-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${(p) => p.theme.space[3]};
    border-radius: 0;
    border: none;
  }
`;

const OptionWrapper = styled.label<{ isChecked: boolean }>`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: ${(p) => p.theme.space[2]};
  padding: ${(p) => p.theme.space[3]};
  background-color: ${(p) =>
    p.isChecked ? p.theme.colors.blue10 : p.theme.colors.white};
  cursor: pointer;

  @media only screen and (max-width: 480px) {
    & + & {
      border-top: 1px solid ${(p) => p.theme.colors.gray10};
    }
  }

  @media only screen and (min-width: 480px) {
    grid-template-columns: 1fr;
    grid-gap: ${(p) => p.theme.space[3]};
    justify-items: center;
    text-align: center;
    padding: ${(p) => p.theme.space[4]};
    border-radius: ${(p) => p.theme.misc.borderRadius};
    border: 2px solid ${(p) => p.theme.colors.gray20};
    border-color: ${(p) =>
      p.isChecked ? p.theme.colors.blue60 : p.theme.colors.gray20};
    background-color: ${(p) => p.theme.colors.white};
  }
`;

const SelectionControl = styled.div`
  @media only screen and (min-width: 480px) {
    order: 3;
  }
`;

const LabelText = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 480px) {
    grid-gap: ${(p) => p.theme.space[1]};
    order: 2;
  }
`;

const MobileIllustrationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${(p) => p.theme.space[2]};
  justify-items: center;

  @media only screen and (min-width: 480px) {
    display: none;
  }
`;

const MobileIllustration = styled.img<{ isSelected: boolean }>`
  max-width: 100%;

  ${(p) =>
    !p.isSelected &&
    css`
      opacity: 0.6;
      filter: grayscale(100%);
    `};

  @media only screen and (min-width: 480px) {
    display: none;
  }
`;

const Illustration = styled.img<{ isSelected: boolean }>`
  max-width: 100%;
  display: none;

  ${(p) =>
    !p.isSelected &&
    css`
      opacity: 0.6;
      filter: grayscale(100%);
    `};

  @media only screen and (min-width: 480px) {
    display: block;
    order: 1;
  }
`;

interface DualOptionItem {
  key: string;
  name: string;
  title: string;
  description?: string;
  illustration?: string;
  checked: boolean;
  onChange: () => void;
}

interface DualOptionProps {
  selectionMode: "single" | "multi";
  items: DualOptionItem[];
}

export function DualOption(props: DualOptionProps) {
  return (
    <Wrapper>
      <MobileIllustrationWrapper>
        {props.items.map((i: DualOptionItem) => (
          <>
            {i.illustration ? (
              <MobileIllustration
                isSelected={i.checked}
                src={i.illustration}
                alt=""
              />
            ) : null}
          </>
        ))}
      </MobileIllustrationWrapper>
      <DualOptionWrapper>
        {props.items.map((i: DualOptionItem) => (
          <OptionWrapper key={i.key} isChecked={i.checked}>
            <SelectionControl>
              {props.selectionMode === "single" && <Radio {...i} />}
              {props.selectionMode === "multi" && <Checkbox {...i} />}
            </SelectionControl>
            <LabelText>
              <Text isBold={true}>{i.title}</Text>
              <Text size={1}>{i.description}</Text>
            </LabelText>
            {i.illustration ? (
              <Illustration
                isSelected={i.checked}
                src={i.illustration}
                alt=""
              />
            ) : null}
          </OptionWrapper>
        ))}
      </DualOptionWrapper>
    </Wrapper>
  );
}
