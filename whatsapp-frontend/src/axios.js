import axios from 'axios';
const instance=axios.create({
    baseURL:"https://whatsapp-backend-green.vercel.app/"
})
export default instance