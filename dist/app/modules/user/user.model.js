"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: user_constant_1.status,
        default: 'pending',
    },
    password: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ id }, { id: 1, password: 1, role: 1, _id: 1 });
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return givenPassword === savedPassword;
    });
};
UserSchema.methods.changedPasswordAfterJwtIssued = function (jwtTimestamp) {
    console.log({ jwtTimestamp }, 'hi');
};
// User.create() / user.save()
// UserSchema.pre('save', async function (next) {
//   // hashing user password
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bycrypt_salt_rounds)
//   );
//   if (!user.needsPasswordChange) {
//     user.passwordChangedAt = new Date();
//   }
//   next();
// });
exports.User = (0, mongoose_1.model)('User', UserSchema);
// UserSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser> | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );
// };
// UserSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };
