const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: String,
    phoneNumber: Number,
    rights: Array,
    email: String,
    hash: String,
    salt: String,
    createdAt: String,
    updatedAt: String
});

mongoose.model('User', UserSchema);