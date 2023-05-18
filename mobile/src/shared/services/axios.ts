import axios from 'axios'

// const { API_URL } = '@env'
// const { GITHUB_CLIENT_ID } = process.env

const API_URL = 'lorem_ipsum'

const axiosConfig = {
  baseURL: API_URL,
}

export const api = axios.create(axiosConfig)
