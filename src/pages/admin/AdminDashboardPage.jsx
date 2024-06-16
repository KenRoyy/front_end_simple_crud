import { Button, Stack,Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import { useEffect } from 'react';

export const AdminDashboardPage = () => {
  const { getUsers, users, deleteUser, success, resetSuccess } = useUsers()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        resetSuccess()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, resetSuccess])

  const styleDiv = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: '1rem',
    margin: '0.5rem 0'
  }

  if (!Array.isArray(users)) {
    console.log('cargando usuarios')
    return <div>Cargando usuarios...</div>
  }

  return (
    <div className='container' style={{ paddingTop: '1rem' }}>
      <h2>Lista Usuarios</h2>
      <Link to={'/admin/create'}>
        <Button>
          Crear nuevo usuario
        </Button>
      </Link>

      <div>
        <br />
        <div style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
          Usuarios
        </div>

        {success && <Alert variant='danger' >{success}</Alert>}

        <Stack>
          {
            users.map(user => (
              <div style={styleDiv} key={user.user_id}>
                <div>
                  <b>Nombre de usuario: </b>{user.username}
                </div>
                <div>
                  <b>Email: </b>{user.email}
                </div>
                <div>
                  <b>Rol: </b>{user.role}
                </div>
                <div>
                  <Link to={`/admin/${user.user_id}`} style={{ margin: '0 1rem' }}>
                    <Button>
                      Editar
                    </Button>
                  </Link>
                  <Button onClick={() => { deleteUser(user.user_id) }} variant="danger" style={{ margin: '0 1rem' }}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))
          }
        </Stack>
      </div>
    </div>
  )
}
