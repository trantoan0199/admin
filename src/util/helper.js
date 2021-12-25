import Axios from 'axios'
import { URL_API } from '../config'

const create = (url, data) => {
    return Axios.post(`${URL_API}${url}`, data)
}

const deleteItem = (url, id) => {
    return Axios.delete(`${URL_API}${url}/${id}`)
}

const update = (url, id, data) => {
    return Axios.put(`${URL_API}${url}/${id}`, data)
}

const getList = (url) => {
    return Axios.get(`${URL_API}${url}`)
}

const getOne = (url, id) => {
    return Axios.get(`${URL_API}${url}/${id}`)
}

export const HttpRequest = {
    create,
    delete: deleteItem,
    getList,
    getOne,
    update
}