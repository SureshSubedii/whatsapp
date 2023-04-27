import mongoose from 'mongoose'
const userSchema=mongoose.Schema({
    email:String,
    password:String,
    name:String
});
export default mongoose.model('user',userSchema);