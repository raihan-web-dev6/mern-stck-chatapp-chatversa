import jwt from "jsonwebtoken";
const gentoken= async(id)=>{
    try {
        const token =jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"8d"})
        return token
    } catch (error) {
        console.log("Error in generating token",error.message);
    }
}
export default gentoken;