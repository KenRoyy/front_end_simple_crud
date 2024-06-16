import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
        <h1>404 = Not Found</h1>
        <p>Lo siento, la pagina que estas buscando no existe.</p>
        <Link to='/'>Volver a la pagina principal</Link>
    </div>
  )
}
