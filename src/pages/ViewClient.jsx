import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ViewClient = () => {
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
    <div>
      {loading ? <Spinner/> :
        Object.keys(client).length === 0 ?
          <p>No hay resultados</p> : (
            <>
              <h1 className='font-black text-4xl text-blue-900'>Ver Cliente</h1>
              <p className='mt-3'>Información del cliente</p>

              <p className="text-4xl text-gray-600 mt-10">
                <span className="font-bold text-gray-800">Cliente: </span>{client.name}
              </p>
              <p className="text-2xl text-gray-600 mt-4">
                <span className="font-bold text-gray-800">Email: </span>{client.email}
              </p>
              {client.tel && (
                <p className="text-2xl text-gray-600 mt-4">
                  <span className="font-bold text-gray-800">Teléfono: </span>{client.tel}
                </p>
              )}
              <p className="text-2xl text-gray-600 mt-4">
                <span className="font-bold text-gray-800">Empresa: </span>{client.company}
              </p>
              {client.notes && (
                <p className="text-2xl text-gray-600 mt-4">
                  <span className="font-bold text-gray-800">Notas: </span>{client.notes}
                </p>
              )}
            </>
          )}
    </div>
  )
}

export default ViewClient