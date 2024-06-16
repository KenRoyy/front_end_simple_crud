import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Navigation = () => {

    const { isAuthenticated, user, logout } = useAuth()

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Nav >
                    {isAuthenticated ? (
                        <>
                            {user.role === 'admin' && <Nav.Link><Link style={{ textDecoration: 'none', color: '#000' }} to="/admin/dashboard">Lista de usuarios</Link></Nav.Link>}
                            <Nav.Link ><Link style={{ textDecoration: 'none', color: '#000' }} to={'/profile'}>Perfil</Link></Nav.Link>
                            <Nav.Link><Link style={{ textDecoration: 'none', color: '#000' }} to={'support'}>Soporte</Link></Nav.Link>
                            <Nav.Link ><Link onClick={logout} style={{ textDecoration: 'none', color: '#000' }}><b>Cerrar Sesion</b></Link></Nav.Link>
                        </>
                    ) : (
                        <>
                            <Navbar className="justify-content-end">
                                <Nav.Link><Link style={{ textDecoration: 'none', color: '#000' }} to={'/'}>Iniciar secion</Link></Nav.Link>
                                <Nav.Link><Link style={{ textDecoration: 'none', color: '#000' }} to={'/register'}>Registrate</Link></Nav.Link>
                            </Navbar>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}
