import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
 
const createToken = (id) => {
    
    return jwt.sign({id}, process.env.JWT_SECRET);
  }

//loginUser
const loginUser = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User doesn't exist"})
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.json({success:false,message:"Incorrect Password"});
    }
    const token=createToken(user._id);
    res.json({success:true,token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
  

};

//Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email })
    //checking is user already exists
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email fromat & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length<8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });
    const user = await newUser.save()
    const token = createToken(user._id)
    console.log(token);
    res.json({ success:true,token })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
}
export { loginUser, registerUser };
