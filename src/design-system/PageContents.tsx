import React from "react";
import { styled } from "./styled";
import { EchoLogo } from "./EchoLogo";

export const Wrapper = styled.div<{ maxWidth?: number }>`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[3]};
  /* padding-top: ${(p) => p.theme.space[3]}; */
  padding-bottom: ${(p) => `calc(${p.theme.space[5]} * 4)`};
  max-width: ${(p) =>
    `calc(${p.maxWidth || "800"}px + ${p.theme.space[3]} * 2)`};
  margin: 0 auto;

  @media only screen and (min-width: 480px) {
    justify-items: center;
    padding-left: ${(p) => p.theme.space[3]};
    padding-right: ${(p) => p.theme.space[3]};
  }
`;

const LogoWrapper = styled.div`
  padding: ${(p) => p.theme.space[3]};
  padding-bottom: 0;

  @media only screen and (min-width: 480px) {
    padding: ${(p) => p.theme.space[5]};
    padding-bottom: ${(p) => p.theme.space[3]};
  }
`;

interface Props {
  children: React.ReactNode;
  maxWidth?: number;
}

export function PageContents(props: Props) {
  const { children, ...wrapperProps } = props;
  return (
    <Wrapper {...wrapperProps}>
      <LogoWrapper>
        <EchoLogo />
      </LogoWrapper>
      {children}
    </Wrapper>
  );
}
