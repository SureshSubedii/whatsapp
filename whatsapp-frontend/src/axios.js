import axios from 'axios';
const instance=axios.create({
    baseURL:"https://whatsapp-backend-rho.vercel.app/"
})
export default instance