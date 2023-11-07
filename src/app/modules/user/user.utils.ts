import { User } from './user.model';

// Student ID
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  contactNoTowNum: string
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(4, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  const year = new Date().getFullYear().toString();
  incrementedId = `${year.slice(2)}${incrementedId}${contactNoTowNum}`;

  //20 25

  return incrementedId;
};

// Faculty ID
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (
  contactNoTowNum: string
): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(4, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  incrementedId = `F${incrementedId}${contactNoTowNum}`;

  return incrementedId;
};

// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
