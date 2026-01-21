import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 8,
            maxlength: 16,
            lowercase: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Email is invalid"],
        },

        password: {
            type: String,
            required: true,
        }
    },

    {
        timestamps: true,
    }
)

const Users = mongoose.model('Users', userSchema);
export default Users;