import { forwardRef, type SelectHTMLAttributes } from 'react'
import styled from 'styled-components'

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-ink);
  }
`

const StyledSelect = styled.select`
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
`

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, ...selectProps }, ref) => {
    return (
      <Wrapper>
        <span>{label}</span>
        <StyledSelect ref={ref} {...selectProps}>
          {children}
        </StyledSelect>
      </Wrapper>
    )
  },
)

Select.displayName = 'Select'
