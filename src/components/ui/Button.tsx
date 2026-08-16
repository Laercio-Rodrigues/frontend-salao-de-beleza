import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "danger";

const variants = {
  primary: css`
    background: var(--color-wine);
    color: var(--color-ivory);

    &:hover:not(:disabled) {
      background: var(--color-wine-dark);
    }
  `,
  
  secondary: css`
    background: transparent;
    color: var(--color-wine);
    border: 1px solid var(--color-gray-light);
  
    &:hover:not(:disabled) {
      background: var(--color-ivory-dim)
    }
  `,

  danger: css`
    background: var(--color-danger);
    color: var(--color-ivory);

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
};

export const Button = styled.button<{$variant?: Variant }>`
border: none;
border-radius: var(--radius-sm);
padding: 0.85rem 1.5rem;
font-size: 1rem;
font-weight: 600;
transition: background 0.15s ease, opacity 0.15s ease;

&:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

${({$variant = 'primary'}) => variants[$variant]}
`
