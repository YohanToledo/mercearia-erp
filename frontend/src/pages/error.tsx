import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div>
      <h1>Whooops, algo aconteceu... 😓</h1>
      <p>Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:</p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p>
        Voltar para o <Link to="/">Dashboard</Link>
      </p>
    </div>
  )
}
