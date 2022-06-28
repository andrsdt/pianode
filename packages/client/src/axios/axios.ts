import { SERVER_URL } from './../consts'
import axios from 'axios'

export default axios.create({
  baseURL: SERVER_URL,
})
