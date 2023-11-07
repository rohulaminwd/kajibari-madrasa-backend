"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.status = exports.EVENT_FACULTY_CREATED = exports.EVENT_STUDENT_CREATED = void 0;
exports.EVENT_STUDENT_CREATED = 'student.created';
exports.EVENT_FACULTY_CREATED = 'faculty.created';
exports.status = ['active', 'deActive', 'pending'];
exports.userSearchableFields = [
    'id',
    'contactNo',
    'name',
    'rollNo',
    'rollNo',
];
exports.userFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'contactNo',
    'emergencyContactNo',
];
