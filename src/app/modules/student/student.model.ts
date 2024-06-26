import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './student.constant';
import { IStudent, StudentModel } from './student.interface';

export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
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
      enum: gender,
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
      enum: bloodGroup,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
