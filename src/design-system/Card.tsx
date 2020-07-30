import styled from "./styled";

interface Props {
  justify?: "start" | "center" | "end" | "stretch";
}

export const Card = styled.div<Props>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[3]};
  padding: ${(p) => p.theme.space[3]};
  background-color: ${(p) => p.theme.colors.white};
  justify-items: ${(p) => p.justify || "stretch"};

  @media only screen and (min-width: 480px) {
    grid-gap: ${(p) => p.theme.space[4]};
    padding: ${(p) => p.theme.space[5]};
    border-radius: ${(p) => p.theme.misc.borderRadius};
    box-shadow: ${(p) => p.theme.misc.cardShadow};
  }
`;
