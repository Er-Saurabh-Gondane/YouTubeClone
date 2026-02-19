import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength:3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // important: not returned by default
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
userSchema.index({email:1},{unique:true});

// Hash Password Before save

userSchema.pre('save', async function () {
    if (!this.isModified("password")) {
        return;
    }

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
});

// compare password
userSchema.methods.comparePassword = function (plainPassword){
    return bcrypt.compare(plainPassword,this.password);
}


export default model("User",userSchema);