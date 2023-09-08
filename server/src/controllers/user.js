import User from "../model/user.js";
//util
import { encryptPass, decryptPass } from "../util/encryptDecrypt.js";
import { createToken } from "../util/jwt.js";
//config
import { status } from "../config/status.js";
import { message } from "../config/message.js";

class Users {
    register = async(req,res) =>{

        try {
            const { name,email,password } = req.body;

            if(!name || !email || !password) {
                return res.status(406).json({
                    status:status.NOT_ACCEPTABLE,
                    message:message.EMPTY_FIELD
                });
            }
    
            //check user
            const checkUser = await User.findOne({ email });
    
            if(checkUser) {
                return res.status(400).json({
                    status:status.BAD_REQUEST,
                    message:message.ALREADY_REGISTERED
                });
            }
    
            const encryptPassword = await encryptPass(password);
            
            const userData = new User({
                name,
                email,
                password:encryptPassword 
            });
    
            const user = await userData.save();
    
            const token = await createToken(user._id);
    
            return res.status(201).json({
                status:status.CREATED,
                message:message.REGISTERED,
                token
            });  
        } catch (error) {
            return res.status(400).json({status:status.BAD_REQUEST,message:error.message});
        }
    }

    login = async(req,res) =>{
        try {
            const { email,password } = req.body;

            if(!email || !password) {
                return res.status(406).json({
                    status:status.NOT_ACCEPTABLE,
                    message:message.EMPTY_FIELD
                });
            }
    
            const user = await User.findOne({ email }).select("+password");
           
            if(!user) {
                return res.status(404).json({
                    status:status.NOT_FOUND,
                    message:message.NOT_REGISTERED
                });
            }
    
            const decrypt = await decryptPass(password,user.password);
    
            if(!decrypt) {
                  return res.status(401).json({status:400,message:message.LOGIN_FAILED})
            }
    
            const token = await createToken(user._id);
    
            return res.status(200).json({status:200,message:message.LOGIN_SUCCESS,token});
        } catch (error) {
            return res.status(400).json({status:status.BAD_REQUEST,message:error.message});
        }
       
    }

    getUser = async(req,res) =>{
        try {
            const { _id } = req.user;

            const user = await User.findOne({ _id });

            if(!user) {
                return res.status(404).json({
                    status:status.NOT_FOUND,
                    message:message.USER_NOT_FOUND
                })
            }

            return res.status(200).json({
                status:status.SUCCESS,
                data:user
            });
        } catch (error) {
            return res.status(400).json({status:status.BAD_REQUEST,message:error.message});
        }
    }

}

const user = new Users();

export { user };