import { forwardRef, type InputHTMLAttributes } from "react";
import styled from "styled-components";

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-ink);
  }
`;

const Input = styled.input`
  border: 1px solid var(--color-gray-light);
  border-radius: var(--radius-sm);
  padding: 0.75rem 0.9rem;
  font-size: 1rem;
  background: white;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: var(--color-gold);
    outline: none;
  }
`;

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...inputProps }, ref) => {
    return (
      <Wrapper>
        <span>{label}</span>
        <Input ref={ref} {...inputProps} />
      </Wrapper>
    );
  },
);

TextField.displayName = 'TextField'