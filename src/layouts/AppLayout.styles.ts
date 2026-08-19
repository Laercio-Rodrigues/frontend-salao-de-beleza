import styled from 'styled-components'

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

export const Sidebar = styled.aside`
  background: var(--color-wine);
  color: var(--color-ivory);
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.25rem;

  @media (max-width: 860px) {
    display: none;
  }
`

export const Brand = styled.div`
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-ivory);
  margin-bottom: 2.5rem;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`

export const NavItem = styled.a`
  color: var(--color-gold-light);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  transition: background 0.15s ease;

  &:hover {
    background: rgba(251, 247, 243, 0.08);
  }

  &.active {
    background: rgba(251, 247, 243, 0.14);
    color: var(--color-ivory);
  }
`

export const UserBox = styled.div`
  border-top: 1px solid rgba(251, 247, 243, 0.16);
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-size: 0.85rem;
    color: var(--color-gold-light);
  }

  button {
    background: none;
    border: none;
    color: var(--color-ivory);
    font-size: 0.85rem;
    text-align: left;
    padding: 0;
    opacity: 0.75;

    &:hover {
      opacity: 1;
    }
  }
`

export const Content = styled.main`
  padding: 2.5rem;
  overflow-y: auto;

  @media (max-width: 860px) {
    padding: 1.5rem;
  }
`