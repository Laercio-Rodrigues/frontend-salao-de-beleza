import styled from "styled-components";

type Tone = "danger" | "success";

const tones: Record<Tone, { bg: string; color: string }> = {
  danger: { bg: "rgba(162, 62, 54, 0.08)", color: "var(--color-danger" },
  success: { bg: "rgba(107, 143, 113, 0.1)", color: "var(--color-success)" },
};

export const Alert = styled.p<{ $tone?: Tone }>`
  border-radius: var(--radius-sm);
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  background: ${({ $tone = "danger" }) => tones[$tone].bg};
  color: ${({ $tone = "success" }) => tones[$tone].color};
`;
