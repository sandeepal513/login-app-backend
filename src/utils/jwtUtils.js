import jwt from 'jsonwebtoken';
import { secret_key } from './../config/jwt_config.js';

const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
    }

    return jwt.sign(
        payload,
        secret_key,
        {
            expiresIn: '5s'
        }
    )
};


export {
    generateToken,

}