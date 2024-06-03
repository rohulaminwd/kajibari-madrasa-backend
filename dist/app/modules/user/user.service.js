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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("../admin/admin.model");
const faculty_model_1 = require("../faculty/faculty.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const user_utils_1 = require("./user.utils");
// ============== Create a New Student ================== //
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // If password is not given,set default password
    if (!user.password) {
        user.password = index_1.default.default_student_pass;
    }
    // set role
    user.role = 'student';
    user.password = (_a = student === null || student === void 0 ? void 0 : student.contactNo) === null || _a === void 0 ? void 0 : _a.slice(8);
    const contactNoTowNum = (_b = student === null || student === void 0 ? void 0 : student.contactNo) === null || _b === void 0 ? void 0 : _b.slice(12);
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // generate student id
        const id = yield (0, user_utils_1.generateStudentId)(contactNoTowNum);
        // set custom id into both  student & user
        user.id = id;
        student.id = id;
        // Create student using sesssin
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        // set student _id (reference) into user.student
        user.student = newStudent[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
        });
    }
    return newUserAllData;
});
// ============== Create a New Faculty ================== //
const createFaculty = (faculty, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // If password is not given,set default password
    const contactNoTowNum = (_c = faculty === null || faculty === void 0 ? void 0 : faculty.contactNo) === null || _c === void 0 ? void 0 : _c.slice(12);
    if (!user.password) {
        user.password = index_1.default.default_faculty_pass;
    }
    user.password = (_d = faculty === null || faculty === void 0 ? void 0 : faculty.contactNo) === null || _d === void 0 ? void 0 : _d.slice(8);
    // set role
    user.role = 'faculty';
    user.status = 'active';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // generate faculty id
        const id = yield (0, user_utils_1.generateFacultyId)(contactNoTowNum);
        // set custom id into both  faculty & user
        user.id = id;
        faculty.id = id;
        // Create faculty using sesssin
        const newFaculty = yield faculty_model_1.Faculty.create([faculty], { session });
        if (!newFaculty.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty ');
        }
        // set faculty _id (reference) into user.student
        user.faculty = newFaculty[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'faculty',
        });
    }
    return newUserAllData;
});
// ============== Create a New Admin ================== //
const createAdmin = (admin, user) => __awaiter(void 0, void 0, void 0, function* () {
    // If password is not given,set default password
    if (!user.password) {
        user.password = index_1.default.default_admin_pass;
    }
    // set role
    user.role = 'admin';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // generate admin id
        const id = yield (0, user_utils_1.generateAdminId)();
        user.id = id;
        admin.id = id;
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty ');
        }
        user.admin = newAdmin[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'admin',
            populate: [
                {
                    path: 'managementDepartment',
                },
            ],
        });
    }
    return newUserAllData;
});
// ============== Get all User by filtering filter ================== //
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // andConditions.push({
    //   status: 'active',
    // });
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereConditions)
        .populate({ path: 'student' })
        .populate({ path: 'faculty' })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// ============== Get My Profile ================== //
const GetMyProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ id })
        .populate({ path: 'student' })
        .populate({ path: 'faculty' });
    return result;
});
// ============== Add new Student active status and rollNo ================== //
const AddStudentActive = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let updateUser = null;
    const options = { new: true };
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Generate a new student ID (assuming generateActiveStudentId works correctly)
        const newId = yield (0, user_utils_1.generateActiveStudentId)(payload === null || payload === void 0 ? void 0 : payload.rollNo);
        // Update user with the new student ID
        const userUpdate = {
            $set: {
                status: 'active',
                id: newId,
            },
        };
        yield user_model_1.User.findOneAndUpdate({ _id: userId }, userUpdate, options).session(session);
        // Update student with the new rollNo and student ID
        const updateStudent = {
            $set: { rollNo: payload === null || payload === void 0 ? void 0 : payload.rollNo, id: newId },
        };
        yield student_model_1.Student.findOneAndUpdate({ _id: payload === null || payload === void 0 ? void 0 : payload.studentId }, updateStudent, options).session(session);
        // Populate user with student and faculty data
        const result = yield user_model_1.User.findOne({ _id: userId })
            .populate({ path: 'student' })
            .populate({ path: 'faculty' })
            .session(session);
        updateUser = result;
        // Commit the transaction
        yield session.commitTransaction();
    }
    catch (error) {
        // Abort the transaction and re-throw the error
        yield session.abortTransaction();
        throw error;
    }
    finally {
        // End the session
        session.endSession();
    }
    return updateUser;
});
// ============== Update User ================== //
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { new: true };
    const result = yield user_model_1.User.findOneAndUpdate({ _id: userId }, payload, options)
        .populate({ path: 'student' })
        .populate({ path: 'faculty' });
    return result;
});
exports.UserService = {
    createStudent,
    createFaculty,
    createAdmin,
    getAllUsers,
    GetMyProfile,
    AddStudentActive,
    updateUser,
};
