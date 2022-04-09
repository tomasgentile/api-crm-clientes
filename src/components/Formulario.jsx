import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from './Alert'
import Spinner from './Spinner'

const Formulario = ({ client, loading }) => {
    const navigate = useNavigate();

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .required('El nombre del cliente es obligatorio')
            .min(3, 'El nombre es muy corto')
            .max(40, 'El nombre es muy largo'),
        company: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .required('El email es obligatorio')
            .email('Email no válido'),
        tel: Yup.number()
            .integer('El número no es válido')
            .positive('El número no es válido')
            .typeError('El número no es válido')
    })

    const handleSubmit = async (values) => {
        try {
            let response;
            if (client.id) {
                // Editar registro
                const url = `http://localhost:4000/clientes/${client.id}`;
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } else {
                // Nuevo registro
                const url = 'http://localhost:4000/clientes';
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            await response.json();
            // redirecciona a Clientes
            navigate('/clientes');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 text-xl text-center font-bold'>
                    {client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
                </h1>
                <Formik
                    initialValues={{
                        name: client.name ? client.name : '',
                        // otra forma de ternario:
                        company: client?.company ?? '',
                        email: client?.email ?? '',
                        tel: client?.tel ?? '',
                        notes: client?.notes ?? ''
                    }}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        // Resetea el formulario
                        resetForm();
                    }}
                    // Pasa el esquema de validación al formulario
                    validationSchema={newClientSchema}
                    // Para cargar los datos de clientes en caso de Edición
                    enableReinitialize={true}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor="name">Nombre:</label>
                                    <Field
                                        id='name'
                                        name='name'
                                        type='text'
                                        className='mt-2 black w-full p-3 bg-gray-50'
                                        placeholder='Nombre del cliente'
                                        autoFocus={true}
                                    />
                                    {errors.name && touched.name ? (
                                        <Alert>{errors.name}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor="company">Empresa:</label>
                                    <Field
                                        id='company'
                                        name='company'
                                        type='text'
                                        className='mt-2 black w-full p-3 bg-gray-50'
                                        placeholder='Empresa del cliente'
                                    />
                                    {errors.company && touched.company ? (
                                        <Alert>{errors.company}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor="email">E-mail:</label>
                                    <Field
                                        id='email'
                                        name='email'
                                        type='email'
                                        className='mt-2 black w-full p-3 bg-gray-50'
                                        placeholder='Email del cliente'
                                    />
                                    {errors.email && touched.email ? (
                                        <Alert>{errors.email}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor="tel">Teléfono:</label>
                                    <Field
                                        id='tel'
                                        name='tel'
                                        type='tel'
                                        className='mt-2 black w-full p-3 bg-gray-50'
                                        placeholder='Teléfono del cliente'
                                    />
                                    {errors.tel && touched.tel ? (
                                        <Alert>{errors.tel}</Alert>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor="notes">Notas:</label>
                                    <Field
                                        as="textarea"
                                        id='notes'
                                        name='notes'
                                        type='text'
                                        className='mt-2 black w-full p-3 bg-gray-50 h-40 resize-none'
                                        placeholder='Notas del cliente'
                                    />
                                </div>
                                <input
                                    type='submit'
                                    value={client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    client: {},
    loading: false
}

export default Formulario
