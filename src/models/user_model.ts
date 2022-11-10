import { Schema, model, connect } from 'mongoose';
import validator from 'validator';

interface IUser {
  email: string;
  password: string;
  avatar?: string;
}
const userSchema = new Schema<IUser>({
  email: { 
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Your password must be longer than 8 characters"],
    select: false,
  },
  avatar: {
    type: String, 
    required: false
  }
});

const User = model<IUser>('User', userSchema);
export default User;