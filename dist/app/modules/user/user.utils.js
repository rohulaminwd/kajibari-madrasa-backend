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
exports.generateAdminId = exports.findLastAdminId = exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = exports.findLastStudentId = exports.generateActiveStudentId = exports.findActiveLastStudentId = void 0;
const user_model_1 = require("./user.model");
// Student ID
const findActiveLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lastStudent = yield user_model_1.User.findOne({
        role: 'student',
        status: 'active',
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    // const result = lastStudent?.id
    //   ? lastStudent?.id?.slice(2, 6)?.substring(4)
    //   : undefined;
    const result = (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? (_a = lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) === null || _a === void 0 ? void 0 : _a.slice(2, 6) : undefined;
    // console.log(result, lastStudent?.id, 'id is id');
    return result;
});
exports.findActiveLastStudentId = findActiveLastStudentId;
const generateActiveStudentId = (roleNO) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findActiveLastStudentId)()) || (0).toString().padStart(4, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
    const year = new Date().getFullYear().toString();
    incrementedId = `${year.slice(2)}${incrementedId}${roleNO}`;
    //20 25
    return incrementedId;
});
exports.generateActiveStudentId = generateActiveStudentId;
// Student ID
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const lastStudent = yield user_model_1.User.findOne({
        role: 'student',
    }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    const result = (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? (_b = lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) === null || _b === void 0 ? void 0 : _b.slice(2, 6) : undefined;
    return result;
});
exports.findLastStudentId = findLastStudentId;
const generateStudentId = (contactNoTowNum) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(4, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
    const year = new Date().getFullYear().toString();
    incrementedId = `${year.slice(2)}${incrementedId}${contactNoTowNum}`;
    //20 25
    return incrementedId;
});
exports.generateStudentId = generateStudentId;
// Faculty ID
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const lastFaculty = yield user_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    const result = (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? (_c = lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) === null || _c === void 0 ? void 0 : _c.slice(1, 4) : undefined;
    return result;
});
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = (contactNoTowNum) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(3, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(3, '0');
    incrementedId = `F${incrementedId}${contactNoTowNum}`;
    return incrementedId;
});
exports.generateFacultyId = generateFacultyId;
// Admin ID
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const lastAdmin = yield user_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    const result = (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? (_d = lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) === null || _d === void 0 ? void 0 : _d.slice(1, 4) : undefined;
    return result;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(3, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(3, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
