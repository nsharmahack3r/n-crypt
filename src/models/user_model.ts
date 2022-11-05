import { Schema, model, connect } from 'mongoose';

interface IUser {
  email: string;
  password: string;
  avatar?: string;
}
const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true 
  },
  password:{
    type: String, 
    required: true 
  },
  avatar: {
    type: String, 
    required: false
  }
});

const User = model<IUser>('User', userSchema);
export default User;