import axios from "axios";

import {
    GET_CATEGORIAS_POSICIONES
} from "@config/envs";

export const getCategoriasPosiciones = () => {
    return axios.get(GET_CATEGORIAS_POSICIONES).then(res => res.data);
}