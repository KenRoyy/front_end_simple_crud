import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { useAuth } from "../../context/AuthContext";
import { Button, Form, Alert } from "react-bootstrap";
import { useUsers } from "../../context/UsersContext";
import { useParams } from "react-router-dom";

export const UserFormPage = () => {

    const { createUser, getUser, updateUser, success, resetSuccess, errors: registerErrors } = useUsers()
    const { user } = useAuth()

    const { register, setValue, handleSubmit, formState: {
        errors
    } } = useForm();

    const params = useParams()

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const user = await getUser(params.id)
                console.log(user)
                setValue('first_name', user.first_name)
                setValue('last_name', user.last_name)
                setValue('username', user.username)
                setValue('number_document', user.number_document)
                setValue('email', user.email)
            }
        }
        loadUser()
    }, [])

    const onSubmit = handleSubmit(async (values) => {
        try {
            if (params.id) {
                updateUser(params.id, values)
            } else {
                createUser(values)
            }
        } catch (error) {
            console.error('error al crear usuario', error)
        }
    })

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                resetSuccess()
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [success, resetSuccess])

    return (
        <div className="container" style={{ padding: "5rem 4rem" }}>
            {success && <Alert variant='success' >{success}</Alert>}
            {/* <h4>Crear usuario</h4> */}
            {
                registerErrors.map((error, i) => (
                    <Alert variant="danger" key={i}>
                        {error}
                    </Alert>
                ))
            }
            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '40%' }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="nombre" {...register('first_name', { required: true })} />
                        </Form.Group>
                        {
                            errors.first_name && <p style={{ color: "red" }}>nombre es requerido </p>
                        }
                    </div>

                    <div style={{ width: '40%' }}>
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
                    <Form.Control type="text" placeholder="username" {...register('username', { required: true })} />
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
                    errors.email && <p style={{ color: "red" }}>Email es requerido</p>
                }

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="contraseña" {...register('password', { required: true })} />
                </Form.Group>
                {
                    errors.password && <p style={{ color: "red" }}>Contraseña es requerida</p>
                }

                {user && user.role == 'admin' && (
                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control as="select" {...register('role', { required: true })}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Form.Control>
                    </Form.Group>
                )}
                <Button variant="primary" type="submit" style={{ margin: "1rem 0", width: '100%' }}>
                    Enviar
                </Button>
            </Form>
        </div>
    )
}
