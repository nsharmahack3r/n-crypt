import { Schema, model, connect } from 'mongoose';
import validator from 'validator';

interface IUser {
  email: string;
  password: string;
  avatar?: string;
  otp?: string;
  lastActive?:string;
  active?:boolean;
  createdAt?:string;
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
  },
  avatar: {
    type: String, 
    required: false
  },
  // otp:{
  //   type: String,
  //   required: false
  // },lastActive: {
  //   type: String,
  //   required: false,
  // },
  // active: {
  //   type: Boolean,
  //   default: false,
  // },
  // createdAt: {
  //   type: String,
  //   default: new Date().toISOString(),
  // },
});

const User = model<IUser>('User', userSchema);
export default User;