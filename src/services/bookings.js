import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/bookings'

const create = async newBooking => {
    const response = await axios.post(baseUrl, newBooking) 
    return response.data   
}

export default { create }