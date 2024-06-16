import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfilePage = () => {

    const { profile, user } = useAuth()

    useEffect(() => {
        profile()
    }, [])

    const styleDiv = {
        backgroundColor: '#000',
        padding: '1rem',
        margin: '0.5rem 0'
    }

    return (
        <div className="container" style={{ marginTop: '3rem' }}>
            <div>
                <h1>Perfil</h1>
                <div>
                    <Stack>
                        <div style={styleDiv}>
                            <b>Primer nombre:</b> {user.first_name}
                        </div>
                        <div style={styleDiv}>
                            <b>Segundo nombre:</b> {user.last_name}
                        </div>
                        <div style={styleDiv}>
                            <b>Nombre de usuario:</b> {user.username}
                        </div>
                        <div style={styleDiv}>
                            <b>Email:</b> {user.email}
                        </div>
                        <div style={styleDiv}>
                            <b>Numero de documento:</b> {user.number_document}
                        </div>

                        {user && user.role == 'admin' && (
                            <div style={styleDiv}>
                                <b>Role: </b> {user.role}
                            </div>
                        )}
                        <div>
                            <Link to={`/admin/${user.id}`} style={{ margin: '0.5rem 0' }}>
                                <Button>
                                    Editar informacion
                                </Button>
                            </Link>
                        </div>
                    </Stack>
                </div>
            </div >
        </div >
    )
}
