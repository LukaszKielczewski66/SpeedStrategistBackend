const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require('../validators');
const randomString = require('randomstring');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email jest wymagany'],
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validateEmail, 'Email nieprawidłowy']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Hasło powinno posiadać min. 4 znaki']
    },
    firstName: String,
    lastName: String,
    icon: String,
    car: String,
    model: String,
    name: String,
    apiToken: String
})

userSchema.path('password').set(value => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(value, salt);
    return hash;
  });

  userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
      error.status = 409;
      error.errors = { email: { message: 'Email jest już zajęty' }};
    }
    next(error);
  });

  userSchema.pre('save', function(next) {
    const user = this;
    if (user.isNew) {
      user.apiToken = randomString.generate(30);
    }
    next();
  })

  userSchema.methods = {
    comparePassword(candidatePassword) {
      return bcrypt.compareSync(candidatePassword, this.password);
    }
  }

  const User = mongoose.model('User', userSchema);

module.exports = User;