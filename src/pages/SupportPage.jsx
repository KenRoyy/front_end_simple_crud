import { Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from "react";
import { useUsers } from '../context/UsersContext';
import { useForm } from "react-hook-form";

export const SupportPage = () => {

    const { getSupport,success, resetSuccess } = useUsers()

    const { register, handleSubmit, formState :{errors} } = useForm()

    useEffect(() => {
        if(success){
            const timer = setTimeout(() => {
                resetSuccess()
            }, 3000)
            return () => clearTimeout(timer)
        }

    },[success,resetSuccess])

    const onSubmit = handleSubmit(async (values) => {
        try {
            await getSupport(values)
        } catch (error) {
            console.log('error al enviar el correo')
        }
    })

    return (
        <div className="container mt-4">
            <h2>Formulario de Soporte</h2>

            {success && <Alert variant='success'>{success}</Alert>}

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type='text' placeholder='asunto' {...register('subject', {required: true})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder='email'{...register('email', {required: true})}/>
                </Form.Group>
                {
                    errors.email && <p style={{color: 'red'}}>Email es requerido</p>
                }

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" name="message" {...register('message', {required: true})} />
                </Form.Group>
                {
                    errors.message && <p style={{color: 'red'}}>Mensaje es requerido</p>
                }

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </div>
    )
}
