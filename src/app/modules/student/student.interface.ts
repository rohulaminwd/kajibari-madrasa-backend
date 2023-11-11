import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  contactNo: string;
  motherName?: string;
  guardianRelationship: string;
  address: string;
  guardianName: string;
};

export type payment = {
  amount: string;
  date: string;
  month: string;
  year: string;
};

export type IStudent = {
  id: string;
  name: string; //embedded object
  gender: 'male' | 'female' | 'others';
  resident: boolean;
  dateOfBirth: string;
  rollNo?: string;
  contactNo: string;
  paymentCard: payment[];
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  department: string;
  profileImage?: string;
  previousSchool?: string;
  previousClass?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
