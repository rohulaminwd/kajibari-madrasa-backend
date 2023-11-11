"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.StudentSchema = void 0;
const mongoose_1 = require("mongoose");
const student_constant_1 = require("./student.constant");
exports.StudentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: student_constant_1.gender,
        default: 'female',
    },
    resident: {
        type: Boolean,
        default: false,
    },
    dateOfBirth: {
        type: String,
    },
    rollNo: {
        type: String,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
    },
    bloodGroup: {
        type: String,
        enum: student_constant_1.bloodGroup,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
    },
    previousSchool: {
        type: String,
    },
    previousClass: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    },
    paymentCard: [],
    guardian: {
        required: true,
        type: {
            fatherName: {
                type: String,
                required: true,
            },
            fatherOccupation: {
                type: String,
                required: true,
            },
            guardianName: {
                type: String,
                required: true,
            },
            guardianRelationship: {
                type: String,
                required: true,
            },
            contactNo: {
                type: String,
            },
            motherName: {
                type: String,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Student = (0, mongoose_1.model)('Student', exports.StudentSchema);
