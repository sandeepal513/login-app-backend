import Users from './../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';


/* { Register User } */ 
const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (username === '' || email === '' || password === '' ) return res.status(400).json({
            message: "Please fill all Fields"
        });

        const usernameExist = await Users.findOne({ username: username.trim() });
        if (usernameExist) return res.status(409).json({
            message: "Username already exist"
        });

        const emailExist = await Users.findOne({ email: email });
        if (emailExist) return res.status(409).json({
            message: "Email already exist"
        });

        if(password.length > 16 || password.length < 8) return res.status(401).json({
            message: "Password must be between 8 and 16 characters",
        });
        const hashPassword = await bcrypt.hash(password, 10);

        await Users.create({
            username,
            email: email.toLowerCase(),
            password: hashPassword
        });

        res.status(201).json({
            message: "Account Created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message,
        })
    }   
};


/* { Check existing Username } */
const CheckUsername = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || username.trim().length < 8) {
      return res.status(400).json({
        message: "wrong username",
      });
    }

    const user = await Users.findOne({ username: username.trim() });

    if (user) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    return res.status(200).json({
      message: "Username is available"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const LoginUser = async(req, res) => {
    try {
        const { username, password} = req.body;
        
        if (!username || !password) return res.status(400).json({
            message: "All fields require",
        });

        const existingUser = await Users.findOne({
            username
        });

        if (!existingUser) return res.status(401).json({
            message: "Username incorrect",
        })

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) return res.status(401).json({
            message: "Passowrd Incorrect",
        })

        const token = generateToken(existingUser);

        return res.status(200).json({
            message: "User login Successfully",
            token,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", 
            error: error.message,
        })
    }
}



export {
    RegisterUser,
    CheckUsername,
    LoginUser,
}