import axios from 'axios'

import { API_URL } from '@env'

const axiosConfig = {
  baseURL: API_URL,
}

export const api = axios.create(axiosConfig)
