const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const { saltRounds } = require('../../../config')

const ROLES = {
    admin: "admin",
    user: "user"
}

const UserSchema = new Schema({
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    firstName:{
        type: String,
        trim: true,
    },
    lastName:{
        type: String,
        trim: true,
    },
    role:{
        type: String,
        default: ROLES.user,
        emun: [ROLES.admin, ROLES.user]
    },
    password:{
        type: String,
        required: true,
        select: false,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    email_verified:{
        type: Boolean,
        default: false
    }
}, {
    collection: "users"
});

const inNewSymbol = Symbol("isNew")

UserSchema.pre("save", function (next) {
    if(this.isModified("password")){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    this[inNewSymbol] = this.isNew;
    next();
})

UserSchema.post("save", function (next) {
    if(this[inNewSymbol]){
        // @TODO sendConfirmEmail
    }
    next();
})

const UserModel = model("UserModel", UserSchema)

module.exports = UserModel;