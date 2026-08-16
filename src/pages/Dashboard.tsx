import { useAuth } from "../context/useAuth"


export function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-display)' }}>
        Bem-vindo, {user?.name}
      </h1>
      <p style={{ color: 'var(--color-gray)', marginTop: '0.5rem' }}>
        As telas de Clientes, Profissionais, Serviços e Agenda entram aqui nas
        próximas fases.
      </p>
      <button
        onClick={logout}
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.2rem',
          background: 'var(--color-wine)',
          color: 'var(--color-ivory)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        Sair
      </button>
    </div>
  )
}