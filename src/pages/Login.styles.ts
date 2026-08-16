import styled from 'styled-components'

export const Page = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 780px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }
`

export const Brand = styled.aside`
    background: var(--color-wine);
    background-image: radial-gradient(
        circle at 15% 85%,
        var(--color-wine-dark) 0%,
        var(--color-wine) 55%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;

    @media (max-width: 780px) {
        padding: 2.5rem 2rem;
    }
`

export const BrandContent = styled.div`
    max-width: 360px;
`

export const Eyebrow = styled.span`
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-gold-light);
`

export const BrandTitle = styled.h1`
    font-size: 3.25rem;
    color: var(--color-ivory);
    margin-top: 0.75rem;

    @media (max-width: 780px) {
        font-size: 2.25rem;
    }
`

export const Flourish = styled.svg`
    display: block;
    width: 140px;
    height: 18px;
    margin-top: 0.25rem;
`

export const BrandText = styled.p`
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 500;
    font-size: 1.15rem;
    color: var(--color-gold-light);
    margin-top: 1.5rem;
    line-height: 1.5;
`

export const FormArea = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`

export const Card = styled.form`
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`

export const FormTitle = styled.h2`
    font-size: 2rem;
    color: var(--color-ink);
`

export const FormSubtitle = styled.p`
    color: var(--color-gray);
    margin-top: -0.75rem;
    font-size: 0.95
`