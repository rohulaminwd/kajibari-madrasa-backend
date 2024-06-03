"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.status = exports.EVENT_FACULTY_CREATED = exports.EVENT_STUDENT_CREATED = void 0;
exports.EVENT_STUDENT_CREATED = 'student.created';
exports.EVENT_FACULTY_CREATED = 'faculty.created';
exports.status = ['active', 'deActive', 'pending'];
exports.userSearchableFields = [
    'id',
    'student.contactNo',
    'student.name',
    'faculty.name',
    'student.rollNo',
    'student.department',
    'role',
    'status',
];
exports.userFilterableFields = [
    'searchTerm',
    'id',
    'status',
    'bloodGroup',
    'contactNo',
    'student.name',
    'student.department',
    'faculty.name',
    'role',
];
