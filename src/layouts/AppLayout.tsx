import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import {
  Shell,
  Sidebar,
  Brand,
  Nav,
  NavItem,
  UserBox,
  Content,
} from './AppLayout.styles'

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <Shell>
      <Sidebar>
        <Brand>Salão</Brand>

        <Nav>
          <NavItem as={NavLink} to="/clientes">
            Clientes
          </NavItem>
          <NavItem as={NavLink} to="/profissionais">
            Profissionais
          </NavItem>
          <NavItem as={NavLink} to="/servicos">
            Serviços
          </NavItem>
          <NavItem as={NavLink} to="/agenda">
            Agenda
          </NavItem>
        </Nav>

        <UserBox>
          <span>{user?.name}</span>
          <button onClick={logout}>Sair</button>
        </UserBox>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Shell>
  )
}
