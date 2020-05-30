import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://app-cadprodutos.herokuapp.com/api/'
})