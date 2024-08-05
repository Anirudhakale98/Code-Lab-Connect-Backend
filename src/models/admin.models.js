import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    orgName: {
      type: String,
      required: [true, "Organization name is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// password comparison method
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// add a method to the adminSchema to compare passwords
adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// add a method to the adminSchema to generate a access token
adminSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      orgName: this.orgName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// add a method to the adminSchema to generate a refresh token
adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
