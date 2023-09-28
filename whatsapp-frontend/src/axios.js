import axios from 'axios';
const instance=axios.create({
    baseURL:"https://whatsapp-backend-8mdgk9i2t-sureshsubedii.vercel.app/" /* https://whatsapp-backend-green.vercel.app/*/
})
export default instance