import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: 9
    },
    workExperience:{
      type: Array(Object),
    },
    age: {type: Number},
    role: {
      type: String,
      default: "User",
      enum :["Admin", "User"]
    }
  })

const   User = mongoose.model('user', UserSchema);

export default User