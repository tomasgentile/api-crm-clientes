import Formulario from "../components/Formulario"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const EditClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        console.log(response)
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getClientAPI();
  }, []);


  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos del cliente</p>

      {client?.name ? (
        <Formulario
          client={client}
          loading={loading}
        />
      ) : <p>ID de cliente no válido</p>}

    </>
  )
}

export default EditClient