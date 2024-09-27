import axios from "axios";
import { Cadete } from "@src/types/club/cadete";

import { 
    GET_CADETES, 
    GET_CADETE_BY_ID, 
    POST_CADETE_IMAGE,
    REMOVE_APODERADO_FROM_CADETE,
    GET_PAGOS_FROM_CADETE,
} from "@config/envs";


export const getCadetes = () => {
    return axios.get(GET_CADETES).then(res => res.data)
}

export const getCadeteById = (id: Cadete["id"]) => {
    return axios.get(GET_CADETE_BY_ID).then(res => res.data)
}

export const removeApoderadoFromCadete = (id: Cadete["id"]) => {
    return axios.post(REMOVE_APODERADO_FROM_CADETE, { id }).then(res => res.data)
}

export const uploadProfileImage = (formData: object) => {
    return formData ? true : false
    return axios.post(POST_CADETE_IMAGE, formData)
}

export const getPagosFromCadete = (id: Cadete["id"]) => {
    return axios.get(GET_PAGOS_FROM_CADETE).then(res => res.data)
}