import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      token: {
        type: String,
        select: false,
      },
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    // address: {
    //   street: {
    //     type: String,
    //     required: true,
    //   },
    //   city: {
    //     type: String,
    //     required: true,
    //   },
    //   state: {
    //     type: String,
    //     required: true,
    //   },
    //   zipCode: {
    //     type: String,
    //     required: true,
    //   },
    //   country: {
    //     type: String,
    //     required: true,
    //   },
    // },
    // phoneNumber: {
    //   type: String,
    //   required: true,
    // },
    // dateOfBirth: {
    //   type: Date,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  const fullName = this.fullName.trim();

  // Split the full name into first and last name
  const splitName = fullName.split(' ');
  this.firstName = splitName[0];
  this.lastName = splitName[splitName.length - 1];
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
