import { Button, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

export const RegisterPage = () => {

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();

    const { signup, errors: registerErrors, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/profile')
    }, [isAuthenticated])


    const onSubmit = handleSubmit(async (values) => {
        try{
            signup(values)
        }catch(error){
            console.error('error al registrar usuario', error)
        }
    })

    return (
        <div className="container" style={{ padding: "5rem 4rem" }}>
            <h4 style={{fontSize: '2.3rem', marginBottom: '2rem'}}>Registro</h4>
            {
                registerErrors.map((error, i) => ( 
                    <Alert variant="danger" key={i}>
                        {error}
                    </Alert>
                ))
            }
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{width: '40%'}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="nombre" {...register('first_name', { required: true })} />
                        </Form.Group>
                        {
                            errors.first_name && <p style={{ color: "red" }}>nombre es requerido </p>
                        }
                    </div>

                    <div style={{width: '40%'}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" placeholder="apellido" {...register('last_name', { required: true })} />
                        </Form.Group>
                        {
                            errors.last_name && <p style={{ color: 'red' }}>apellido es requerido</p>
                        }

                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="usuario" {...register('username', { required: true })} />
                </Form.Group>
                {
                    errors.username && <p style={{ color: "red" }}>Usuario es requerido</p>
                }

                <Form.Group className='mb-3'>
                    <Form.Label>Numero de documento</Form.Label>
                    <Form.Control type="number" placeholder="numero de documento" {...register('number_document', { required: true })} />
                </Form.Group>
                {
                    errors.number_document && <p style={{ color: "red" }}>Numero de documento es requerido</p>
                }

                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" {...register('email', { required: true })} />
                </Form.Group>
                {
                    errors.email && <p style={{ color: "red"}}>Email es requerido</p>
                }

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="contraseña" {...register('password', { required: true })} />
                </Form.Group>
                {
                    errors.password && <p style={{color: "red"}}>Contraseña es requerida</p>
                }

                <Button variant="primary" type="submit" style={{ margin: "1rem 0", width: '100%' }}>
                    Enviar
                </Button>
            </Form>

            <div style={{marginTop: '1.5rem'}}>
                <Link to={'/login'}>
                    <Button variant="light" style={{width: '100%'}}>
                        ¿Ya tienes una cuenta? Inicia Sesion
                    </Button>
                </Link>
            </div>
        </div>
    )
}
