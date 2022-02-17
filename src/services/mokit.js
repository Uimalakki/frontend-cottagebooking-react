import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/cottages'

const haeKaikki = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default { haeKaikki }