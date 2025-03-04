'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
// const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const user_model_1 = require('../user/user.model');
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    if (
      isUserExist.password &&
      !(yield user_model_1.User.isPasswordMatched(
        password,
        isUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorrect'
      );
    }
    //create access token & refresh token
    const { id: userId, role, _id } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId, role, _id },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId, role, _id },
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN
    );
    return {
      accessToken,
      refreshToken,
    };
  });
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid Refresh Token'
      );
    }
    const { userId } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        id: isUserExist.id,
        role: isUserExist.role,
      },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    return {
      accessToken: newAccessToken,
    };
  });
const changePassword = (user, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // // checking is user exist
    // const isUserExist = await User.isUserExist(user?.userId);
    //alternative way
    const isUserExist = yield user_model_1.User.findOne({
      id: user === null || user === void 0 ? void 0 : user.userId,
    }).select('+password');
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist'
      );
    }
    // checking old password
    if (
      isUserExist.password &&
      !(yield user_model_1.User.isPasswordMatched(
        oldPassword,
        isUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Old Password is incorrect'
      );
    }
    // // hash password before saving
    // const newHashedPassword = await bcrypt.hash(
    //   newPassword,
    //   Number(config.bycrypt_salt_rounds)
    // );
    // const query = { id: user?.userId };
    // const updatedData = {
    //   password: newHashedPassword,  //
    //   needsPasswordChange: false,
    //   passwordChangedAt: new Date(), //
    // };
    // await User.findOneAndUpdate(query, updatedData);
    // data update
    isUserExist.password = newPassword;
    // updating using save()
    isUserExist.save();
  });
exports.AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
