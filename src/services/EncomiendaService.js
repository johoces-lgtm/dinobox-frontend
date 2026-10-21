import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/encomienda';

class EncomiendaService {
    // 1. Consultar encomienda por código (GET)
    obtenerPorCodigo(codigo) {
        return axios.get(`${BASE_URL}/${codigo}`);
    }

    // 2. Registrar nueva encomienda (POST)
    registrarEncomienda(datos) {
        return axios.post(BASE_URL, datos);
    }

    // 3. Actualizar estado de la encomienda (PUT)
    actualizarEstado(codigo, datos) {
        return axios.put(`${BASE_URL}/${codigo}`, datos);
    }

    // 4. Listar todas las encomiendas (GET)
    listarEncomiendas() {
        return axios.get(BASE_URL);
    }

    // 5. Eliminar encomienda por código (DELETE)
    eliminarEncomienda(codigo) {
        return axios.delete(`${BASE_URL}/${codigo}`);
    }

}

export default new EncomiendaService();