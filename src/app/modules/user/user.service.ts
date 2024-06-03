import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import {
  generateActiveStudentId,
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

// ============== Create a New Student ================== //

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';
  user.password = student?.contactNo?.slice(8);
  const contactNoTowNum: string = student?.contactNo?.slice(12);

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await generateStudentId(contactNoTowNum);
    // set custom id into both  student & user
    user.id = id;
    student.id = id;

    // Create student using sesssin
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
    });
  }

  return newUserAllData;
};

// ============== Create a New Faculty ================== //

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  const contactNoTowNum: string = faculty?.contactNo?.slice(12);
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  user.password = faculty?.contactNo?.slice(8);
  // set role
  user.role = 'faculty';
  user.status = 'active';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate faculty id
    const id = await generateFacultyId(contactNoTowNum);
    // set custom id into both  faculty & user
    user.id = id;
    faculty.id = id;
    // Create faculty using sesssin
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }
    // set faculty _id (reference) into user.student
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
    });
  }

  return newUserAllData;
};

// ============== Create a New Admin ================== //

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate admin id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

// ============== Get all User by filtering filter ================== //

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .populate({ path: 'student' })
    .populate({ path: 'faculty' })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// ============== Get My Profile ================== //

const GetMyProfile = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ id })
    .populate({ path: 'student' })
    .populate({ path: 'faculty' });
  return result;
};

// ============== Add new Student active status and rollNo ================== //

const AddStudentActive = async (
  userId: string,
  payload: Partial<any>
): Promise<IUser | null> => {
  let updateUser = null;

  const options = { new: true };
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate a new student ID (assuming generateActiveStudentId works correctly)
    const newId = await generateActiveStudentId(payload?.rollNo);

    // Update user with the new student ID
    const userUpdate = {
      $set: {
        status: 'active',
        id: newId,
      },
    };
    await User.findOneAndUpdate({ _id: userId }, userUpdate, options).session(
      session
    );

    // Update student with the new rollNo and student ID
    const updateStudent = {
      $set: { rollNo: payload?.rollNo, id: newId },
    };
    await Student.findOneAndUpdate(
      { _id: payload?.studentId },
      updateStudent,
      options
    ).session(session);

    // Populate user with student and faculty data
    const result = await User.findOne({ _id: userId })
      .populate({ path: 'student' })
      .populate({ path: 'faculty' })
      .session(session);
    updateUser = result;

    // Commit the transaction
    await session.commitTransaction();
  } catch (error) {
    // Abort the transaction and re-throw the error
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session
    session.endSession();
  }

  return updateUser;
};

// ============== Update User ================== //

const updateUser = async (
  userId: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const options = { new: true };

  const result = await User.findOneAndUpdate({ _id: userId }, payload, options)
    .populate({ path: 'student' })
    .populate({ path: 'faculty' });

  return result;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsers,
  GetMyProfile,
  AddStudentActive,
  updateUser,
};
