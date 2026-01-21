import crypto from 'crypto';


// generate random secret key 
const secret_key = crypto.randomBytes(32).toString('hex');

export {
    secret_key,
    
}