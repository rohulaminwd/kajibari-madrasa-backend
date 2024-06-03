export const EVENT_STUDENT_CREATED = 'student.created';
export const EVENT_FACULTY_CREATED = 'faculty.created';

export const status = ['active', 'deActive', 'pending'];

export const userSearchableFields = [
  'id',
  'student.contactNo',
  'student.name',
  'faculty.name',
  'student.rollNo',
  'student.department',
  'role',
  'status',
];

export const userFilterableFields = [
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
