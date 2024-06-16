import {Button, Form, Alert} from 'react-bootstrap/';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signin, errors: singninErrors, isAuthenticated } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/profile')
    }, [isAuthenticated])

    const onSubmit = handleSubmit((data) => {
        signin(data)
    })

    return (
        <div className='container' style={{ paddingTop: "3rem" }}>
            <h4 style={{fontSize: '2.3rem', marginBottom: '2rem'}}>Iniciar sesion</h4>
            {
                singninErrors.map((error, i) => (
                    <Alert variant='danger' key={i}>
                        {error}
                    </Alert>
                ))
            }
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" {...register('email', { required: true })} />
                </Form.Group>
                {
                    errors.email && <p style={{ color: 'red' }}>email es requrido</p>
                }

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="contraseña" {...register('password', { required: true })} />
                </Form.Group>
                {
                    errors.password && <p style={{ color: 'red' }}>contraseña es requerida</p>
                }

                <Button style={{ width: "100%", backgroundColor: "#446efd", marginTop: '1.5rem' }} type="submit">
                    Iniciar Secion
                </Button>
            </Form>

            <div style={{ marginTop: '1.5rem' }}>
                <Link to={'/register'} >
                    <Button variant="light" style={{ width: '100%' }}>
                        ¿No tienes una cuenta? Regístrate
                    </Button>
                </Link>
            </div>
        </div>
    )
}
