import { User } from './user.model';

// Student ID
export const findActiveLastStudentId = async (): Promise<
  string | undefined
> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
      status: 'active',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  // const result = lastStudent?.id
  //   ? lastStudent?.id?.slice(2, 6)?.substring(4)
  //   : undefined;
  const result = lastStudent?.id ? lastStudent?.id?.slice(2, 6) : undefined;

  // console.log(result, lastStudent?.id, 'id is id');

  return result;
};

export const generateActiveStudentId = async (
  roleNO: string
): Promise<string> => {
  const currentId =
    (await findActiveLastStudentId()) || (0).toString().padStart(4, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  const year = new Date().getFullYear().toString();
  incrementedId = `${year.slice(2)}${incrementedId}${roleNO}`;

  //20 25

  return incrementedId;
};

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
  const result = lastStudent?.id ? lastStudent?.id?.slice(2, 6) : undefined;
  return result;
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

  const result = lastFaculty?.id ? lastFaculty?.id?.slice(1, 4) : undefined;

  return result;
};

export const generateFacultyId = async (
  contactNoTowNum: string
): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(3, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(3, '0');
  incrementedId = `F${incrementedId}${contactNoTowNum}`;

  return incrementedId;
};

// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  const result = lastAdmin?.id ? lastAdmin?.id?.slice(1, 4) : undefined;

  return result;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(3, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(3, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
