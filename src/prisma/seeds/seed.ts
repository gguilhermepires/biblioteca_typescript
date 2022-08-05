import { CourseType, ExamType, GradeType } from '@prisma/client';

import { prismaClient } from '../../database/prismaClient';
import DataConverter from '../../infrastructure/dataConverter';
import NumberConverter from '../../infrastructure/numberConverter';

function generateRandomStringNumber() {
  return `${NumberConverter.getRandomInt(1000)}${NumberConverter.getRandomInt(
    1000,
  )}${NumberConverter.getRandomInt(1000)}${NumberConverter.getRandomInt(
    1000,
  )}${NumberConverter.getRandomInt(1000)}${NumberConverter.getRandomInt(1000)}`;
}

async function createAclGrant() {
  const roleStaff = await prismaClient.aclGrant.create({
    data: {
      role: 'staff',
      resource: '*',
      action: '*',
      attributes: '*',
    },
  });

  const roleTeacher = await prismaClient.aclGrant.create({
    data: {
      role: 'teacher',
      resource: 'Programme,Course',
      action: 'select,insert,update,delete',
      attributes: '*',
    },
  });

  const roleStudent = await prismaClient.aclGrant.create({
    data: {
      role: 'student',
      resource: 'Programme,Course',
      action: 'select',
      attributes: '*',
    },
  });
  return {
    roleStaff,
    roleStudent,
    roleTeacher,
  };
}

async function createProgrammes() {
  const programme01 = await prismaClient.programme.create({
    data: {
      displayName: 'Programme 01',
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-12-30 09:00:00'),
      language: 'EN',
    },
  });
  const programme02 = await prismaClient.programme.create({
    data: {
      displayName: 'Programme 02',
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2030-12-01 09:00:00'),
      language: 'EN',
    },
  });

  const programme03 = await prismaClient.programme.create({
    data: {
      displayName: 'Programme 03',
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2023-12-01 09:00:00'),
      language: 'FR',
    },
  });

  return {
    programme01,
    programme02,
    programme03,
  };
}

async function createPeriods(programmes: any) {
  const period01P01 = await prismaClient.period.create({
    data: {
      programmeId: programmes.programme01.id,
      displayName: 'Period 1',
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const period02P01 = await prismaClient.period.create({
    data: {
      programmeId: programmes.programme01.id,
      displayName: 'Period 2',
      startDate: DataConverter.stringDataToDateObject('2022-02-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-03-31 09:00:00'),
    },
  });
  const period03P01 = await prismaClient.period.create({
    data: {
      programmeId: programmes.programme01.id,
      displayName: 'Period 3',
      startDate: DataConverter.stringDataToDateObject('2022-04-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-05-31 09:00:00'),
    },
  });
  const period01P02 = await prismaClient.period.create({
    data: {
      programmeId: programmes.programme02.id,
      displayName: 'Period 1 - p2',
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const period02P02 = await prismaClient.period.create({
    data: {
      programmeId: programmes.programme02.id,
      displayName: 'Period 2 - p2',
      startDate: DataConverter.stringDataToDateObject('2022-02-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-02-27 09:00:00'),
    },
  });
  const period01P03 = await prismaClient.period.create({
    data: {
      programmeId: programmes.programme03.id,
      displayName: 'Period 1 - p3',
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
    },
  });

  return {
    period01P01,
    period01P02,
    period02P01,
    period02P02,
    period03P01,
    period01P03,
  };
}

async function createCohorts(programmes: any) {
  const cohort01 = await prismaClient.cohort.create({
    data: {
      displayName: 'Cohort 1',
      identifier: 'cohort01',
      isActive: true,
      programmeId: programmes.programme01.id,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const cohort02 = await prismaClient.cohort.create({
    data: {
      displayName: 'Cohort 2',
      identifier: 'cohort02',
      isActive: true,
      programmeId: programmes.programme01.id,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const cohort03 = await prismaClient.cohort.create({
    data: {
      displayName: 'Cohort 3',
      identifier: 'cohort03',
      isActive: true,
      programmeId: programmes.programme01.id,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });

  const cohort04 = await prismaClient.cohort.create({
    data: {
      displayName: 'Cohort 4',
      identifier: 'cohort04',
      isActive: true,
      programmeId: programmes.programme01.id,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });

  return {
    cohort01,
    cohort02,
    cohort03,
    cohort04,
  };
}

async function createStudentCohort(students: any, cohorts: any) {
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      userId: students.student01.id,
    },
  });
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      userId: students.primeitstudent.id,
    },
  });

  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      userId: students.student03.id,
    },
  });
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      userId: students.student04.id,
    },
  });

  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort02.id,
      userId: students.student05.id,
    },
  });
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort02.id,
      userId: students.student06.id,
    },
  });

  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort02.id,
      userId: students.student07.id,
    },
  });

  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort03.id,
      userId: students.student08.id,
    },
  });
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort03.id,
      userId: students.student09.id,
    },
  });
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort03.id,
      userId: students.student10.id,
    },
  });

  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort04.id,
      userId: students.student11.id,
    },
  });

  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort04.id,
      userId: students.student12.id,
    },
  });
  await prismaClient.studentCohort.create({
    data: {
      cohortId: cohorts.cohort04.id,
      userId: students.student13.id,
    },
  });
}

async function createStudents() {
  const student01 = await prismaClient.user.create({
    data: {
      email: 'student1@seed.com',
      firstName: 'Student',
      lastName: '1',
      ssoid: '000001',
      isActive: true,
    },
  });
  const primeitstudent = await prismaClient.user.create({
    data: {
      email: 'primeitstudent@primeit.pt',
      firstName: 'primeitstudent',
      lastName: '@primeit.pt',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student03 = await prismaClient.user.create({
    data: {
      email: 'student3@seed.com',
      firstName: 'Student',
      lastName: '3',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student04 = await prismaClient.user.create({
    data: {
      email: 'student4@seed.com',
      firstName: 'Student',
      lastName: '4',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student05 = await prismaClient.user.create({
    data: {
      email: 'student5@seed.com',
      firstName: 'Student',
      lastName: '5',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student06 = await prismaClient.user.create({
    data: {
      email: 'student6@seed.com',
      firstName: 'Student',
      lastName: '6',
      ssoid: generateRandomStringNumber(),
      isActive: false,
    },
  });
  const student07 = await prismaClient.user.create({
    data: {
      email: 'student7@seed.com',
      firstName: 'Student',
      lastName: '7',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student08 = await prismaClient.user.create({
    data: {
      email: 'student8@seed.com',
      firstName: 'Student',
      lastName: '8',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student09 = await prismaClient.user.create({
    data: {
      email: 'student9@seed.com',
      firstName: 'Student',
      lastName: '9',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student10 = await prismaClient.user.create({
    data: {
      email: 'student10@seed.com',
      firstName: 'Student',
      lastName: '10',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student11 = await prismaClient.user.create({
    data: {
      email: 'student11@seed.com',
      firstName: 'Student',
      lastName: '11',
      ssoid: generateRandomStringNumber(),
      isActive: false,
    },
  });
  const student12 = await prismaClient.user.create({
    data: {
      email: 'student12@seed.com',
      firstName: 'Student',
      lastName: '12',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student13 = await prismaClient.user.create({
    data: {
      email: 'student13@seed.com',
      firstName: 'Student',
      lastName: '13',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student14 = await prismaClient.user.create({
    data: {
      email: 'student14@seed.com',
      firstName: 'Student',
      lastName: '14',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student15 = await prismaClient.user.create({
    data: {
      email: 'student15@seed.com',
      firstName: 'Student',
      lastName: '15',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student16 = await prismaClient.user.create({
    data: {
      email: 'student16@seed.com',
      firstName: 'Student',
      lastName: '16',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student17 = await prismaClient.user.create({
    data: {
      email: 'student17@seed.com',
      firstName: 'Student',
      lastName: '17 prime',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student18 = await prismaClient.user.create({
    data: {
      email: 'student18@seed.com',
      firstName: 'Student',
      lastName: '18',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student19 = await prismaClient.user.create({
    data: {
      email: 'student19@seed.com',
      firstName: 'Student',
      lastName: '19',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student20 = await prismaClient.user.create({
    data: {
      email: 'student20@seed.com',
      firstName: 'Student',
      lastName: '20',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student21 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent21@primeit.pt',
      firstName: 'Student',
      lastName: '21',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student22 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent22@primeit.pt',
      firstName: 'Student',
      lastName: '22',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student23 = await prismaClient.user.create({
    data: {
      email: 'student23@seed.com',
      firstName: 'Student',
      lastName: '23',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student24 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent24@primeit.pt',
      firstName: 'Student',
      lastName: '24',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  const student30 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent30@primeit.pt',
      firstName: 'Student',
      lastName: '30',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student31 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent31@primeit.pt',
      firstName: 'Student',
      lastName: '31',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student32 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent32@primeit.pt',
      firstName: 'Student',
      lastName: '32',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });
  const student33 = await prismaClient.user.create({
    data: {
      email: 'primeitstudent33@primeit.pt',
      firstName: 'Student',
      lastName: '33',
      ssoid: generateRandomStringNumber(),
      isActive: true,
    },
  });

  return {
    student01,
    primeitstudent,
    student03,
    student04,
    student05,
    student06,
    student07,
    student08,
    student09,
    student10,
    student11,
    student12,
    student13,
    student14,
    student15,
    student16,
    student17,
    student18,
    student19,
    student20,
    student21,
    student22,
    student30,
    student31,
    student32,
    student33,
    student23,
    student24,
  };
}

async function createTeachers() {
  const primeitteacher1 = await prismaClient.user.create({
    data: {
      email: 'primeitteacher1@primeit.pt',
      firstName: 'primeitteacher1',
      lastName: '@primeit.pt',
      type: 'TEACHER',
      ssoid: generateRandomStringNumber(),
    },
  });
  const teacher02 = await prismaClient.user.create({
    data: {
      email: 'teacher2@seed.com',
      firstName: 'Teacher',
      lastName: '1',
      type: 'TEACHER',
      ssoid: generateRandomStringNumber(),
    },
  });

  const teacher03 = await prismaClient.user.create({
    data: {
      email: 'teacher3@seed.com',
      firstName: 'Teacher',
      lastName: '3',
      type: 'TEACHER',
      ssoid: generateRandomStringNumber(),
    },
  });

  const teacher04 = await prismaClient.user.create({
    data: {
      email: 'teacher4@seed.com',
      firstName: 'Teacher',
      lastName: '4',
      type: 'TEACHER',
      ssoid: generateRandomStringNumber(),
    },
  });

  const teacher05 = await prismaClient.user.create({
    data: {
      email: 'teacher5@seed.com',
      firstName: 'Teacher',
      lastName: '5',
      type: 'TEACHER',
      ssoid: generateRandomStringNumber(),
    },
  });

  return {
    primeitteacher1,
    teacher02,
    teacher03,
    teacher04,
    teacher05,
  };
}

async function createStaffs() {
  const staff01 = await prismaClient.user.create({
    data: {
      email: 'staff@seed.com',
      firstName: 'Staff',
      lastName: '1',
      ssoid: generateRandomStringNumber(),
      type: 'STAFF',
    },
  });
  const staff02 = await prismaClient.user.create({
    data: {
      email: 'staff2@seed.com',
      firstName: 'Staff',
      lastName: '2',
      ssoid: generateRandomStringNumber(),
      type: 'STAFF',
    },
  });
  const staff03 = await prismaClient.user.create({
    data: {
      email: 'staff3@seed.com',
      firstName: 'Staff',
      lastName: '3',
      ssoid: generateRandomStringNumber(),
      type: 'STAFF',
    },
  });
  const staffGpires = await prismaClient.user.create({
    data: {
      email: 'gpires@primeit.pt',
      firstName: 'Guilherme',
      lastName: 'pires',
      ssoid: '90043813',
      type: 'STAFF',
    },
  });

  return {
    staff01,
    staff02,
    staff03,
    staffGpires,
  };
}

async function createAclUserRole(
  grants: any,
  students: any,
  staffs: any,
  teachers: any,
) {
  await prismaClient.aclUserRole.create({
    data: {
      userId: staffs.staffGpires.id,
      AclGrantId: grants.roleStaff.id,
    },
  });
  await prismaClient.aclUserRole.create({
    data: {
      userId: teachers.primeitteacher1.id,
      AclGrantId: grants.roleTeacher.id,
    },
  });

  await prismaClient.aclUserRole.create({
    data: {
      userId: students.student01.id,
      AclGrantId: grants.roleStudent.id,
    },
  });
}

async function createCourses() {
  const course01 = await prismaClient.course.create({
    data: {
      displayName: 'Course 1',
      credits: 100,
      graded: 4,
      maxGrade: 20,
      passingGrade: 5,
      gradeType: GradeType.GRADE,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const course02 = await prismaClient.course.create({
    data: {
      displayName: 'Course 2',
      credits: 100,
      graded: 5,
      maxGrade: 20,
      passingGrade: 5,
      gradeType: GradeType.GRADE,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 10:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const course03 = await prismaClient.course.create({
    data: {
      displayName: 'Course 3',
      credits: 100,
      graded: 4,
      maxGrade: 20,
      passingGrade: 4,
      gradeType: GradeType.GRADE,
      startDate: DataConverter.stringDataToDateObject('2021-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  const courseDeleted = await prismaClient.course.create({
    data: {
      displayName: 'Course 3 - deleted',
      credits: 80,
      graded: 8,
      maxGrade: 20,
      passingGrade: 4,
      startDate: DataConverter.stringDataToDateObject('2021-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-31 09:00:00'),
    },
  });
  await prismaClient.course.delete({ where: { id: courseDeleted.id } });

  const course04 = await prismaClient.course.create({
    data: {
      displayName: 'Course 4',
      credits: 80,
      graded: 8,
      maxGrade: 20,
      passingGrade: 4,
      startDate: DataConverter.stringDataToDateObject('2021-02-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-03-31 09:00:00'),
    },
  });

  const course05 = await prismaClient.course.create({
    data: {
      displayName: 'Course 5',
      credits: 100,
      graded: 10,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2021-02-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-03-31 09:00:00'),
    },
  });
  const course06 = await prismaClient.course.create({
    data: {
      displayName: 'Course 6',
      credits: 100,
      graded: 10,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2021-02-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-03-31 09:00:00'),
    },
  });

  const course07 = await prismaClient.course.create({
    data: {
      displayName: 'Course 7',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-04-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-05-31 09:00:00'),
    },
  });

  const course08 = await prismaClient.course.create({
    data: {
      displayName: 'Course 8',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-04-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-05-31 09:00:00'),
    },
  });

  const course09 = await prismaClient.course.create({
    data: {
      displayName: 'Course 9',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-04-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-05-31 09:00:00'),
    },
  });

  const course10 = await prismaClient.course.create({
    data: {
      displayName: 'Course 10',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 09:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 09:00:00'),
    },
  });
  const course11 = await prismaClient.course.create({
    data: {
      displayName: 'Course 11 - primer',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });
  const course12 = await prismaClient.course.create({
    data: {
      displayName: 'Course 12',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });
  const course13 = await prismaClient.course.create({
    data: {
      displayName: 'Course 13',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 5,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });
  const course14 = await prismaClient.course.create({
    data: {
      displayName: 'Course 14 - elective - label',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 10,
      gradeType: GradeType.LABEL,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });
  const course15 = await prismaClient.course.create({
    data: {
      displayName: 'Course 15 - elective - grade',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 10,
      gradeType: GradeType.GRADE,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });
  const course16 = await prismaClient.course.create({
    data: {
      displayName: 'Course 16 - project',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 10,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });
  const course17 = await prismaClient.course.create({
    data: {
      displayName: 'Course 17 - prime',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 10,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });

  const course18 = await prismaClient.course.create({
    data: {
      displayName: 'Course 18 - label',
      credits: 100,
      graded: 0,
      maxGrade: 20,
      passingGrade: 10,
      startDate: DataConverter.stringDataToDateObject('2022-01-01 00:00:00'),
      endDate: DataConverter.stringDataToDateObject('2022-01-30 00:00:00'),
    },
  });

  return {
    course01,
    course02,
    course03,
    course04,
    course05,
    course06,
    course07,
    course08,
    course09,
    course10,
    course11,
    course12,
    course13,
    course14,
    course15,
    course16,
    course17,
    course18,
  };
}

async function createExams(courses: any) {
  const exam01 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 01',
      weight: 60,
      type: 'EXAM',
      courseId: courses.course01.id,
    },
  });
  const exam03 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 03',
      weight: 60,
      type: 'EXAM',
      courseId: courses.course02.id,
    },
  });
  const exam05 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 05',
      weight: 60,
      type: 'EXAM',
      courseId: courses.course03.id,
    },
  });

  const exam02 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 02',
      weight: 40,
      type: 'CONTINUOUS',
      courseId: courses.course01.id,
    },
  });
  const exam04 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 04',
      weight: 40,
      type: 'CONTINUOUS',
      courseId: courses.course02.id,
    },
  });

  const exam06 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 06',
      weight: 40,
      type: 'CONTINUOUS',
      courseId: courses.course03.id,
    },
  });

  const exam07 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 07',
      weight: 100,
      type: ExamType.EXAM,
      courseId: courses.course03.id,
    },
  });

  const exam08 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 08',
      weight: 40,
      type: ExamType.EXAM,
      courseId: courses.course14.id,
    },
  });
  const exam09 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 09',
      weight: 60,
      type: ExamType.CONTINUOUS,
      courseId: courses.course14.id,
    },
  });
  const exam10 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 10',
      weight: 40,
      type: ExamType.EXAM,
      courseId: courses.course15.id,
    },
  });
  const exam11 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 11',
      weight: 60,
      type: ExamType.CONTINUOUS,
      courseId: courses.course15.id,
    },
  });

  const exam12 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 12',
      weight: 40,
      type: ExamType.EXAM,
      courseId: courses.course18.id,
    },
  });
  const exam13 = await prismaClient.exam.create({
    data: {
      displayName: 'Exam 13',
      weight: 60,
      type: ExamType.CONTINUOUS,
      courseId: courses.course18.id,
    },
  });

  return {
    exam01,
    exam02,
    exam03,
    exam04,
    exam05,
    exam06,
    exam07,
    exam08,
    exam09,
    exam10,
    exam11,
    exam12,
    exam13,
  };
}

async function createCourseCohort(courses: any, cohorts: any, periods: any) {
  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      courseId: courses.course01.id,
      periodId: periods.period01P01.id,
    },
  });

  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort02.id,
      courseId: courses.course02.id,
      periodId: periods.period01P01.id,
    },
  });
  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      courseId: courses.course02.id,
      periodId: periods.period01P01.id,
    },
  });

  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort01.id,
      courseId: courses.course03.id,
      periodId: periods.period01P01.id,
    },
  });
  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort02.id,
      courseId: courses.course03.id,
      periodId: periods.period01P01.id,
    },
  });
  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort03.id,
      courseId: courses.course03.id,
      periodId: periods.period01P01.id,
    },
  });

  await prismaClient.courseCohort.create({
    data: {
      cohortId: cohorts.cohort04.id,
      courseId: courses.course04.id,
      periodId: periods.period01P02.id,
    },
  });
}

async function createStudentCoursePeriodProgramme(
  students: any,
  courses: any,
  periods: any,
) {
  // student 1
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course14.id,
      userId: students.student01.id,
    },
  });

  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course15.id,
      userId: students.student01.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course16.id,
      userId: students.student01.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course17.id,
      userId: students.student01.id,
    },
  });
  // await prismaClient.studentCoursePeriodProgramme.create({
  //   data: {
  //     periodId: periods.period01P01.id,
  //     courseId: courses.course18.id,
  //     userId: students.student01.id,
  //   },
  // });

  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course01.id,
      userId: students.student14.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      courseId: courses.course01.id,
      periodId: periods.period01P01.id,
      userId: students.student15.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      courseId: courses.course01.id,
      periodId: periods.period01P01.id,
      userId: students.student05.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course11.id,
      userId: students.student05.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course12.id,
      userId: students.student05.id,
    },
  });
  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course13.id,
      userId: students.student05.id,
    },
  });

  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course02.id,
      userId: students.student14.id,
    },
  });

  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P01.id,
      courseId: courses.course03.id,
      userId: students.student14.id,
    },
  });

  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P02.id,
      courseId: courses.course10.id,
      userId: students.student16.id,
    },
  });

  await prismaClient.studentCoursePeriodProgramme.create({
    data: {
      periodId: periods.period01P02.id,
      courseId: courses.course10.id,
      userId: students.student17.id,
    },
  });
}

async function createTeacherCourse(teachers: any, courses: any) {
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course01.id,
      userId: teachers.primeitteacher1.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course01.id,
      userId: teachers.teacher03.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course02.id,
      userId: teachers.primeitteacher1.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course02.id,
      userId: teachers.teacher04.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course03.id,
      userId: teachers.teacher02.id,
    },
  });

  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course04.id,
      userId: teachers.teacher04.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course05.id,
      userId: teachers.teacher05.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course06.id,
      userId: teachers.teacher05.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course07.id,
      userId: teachers.teacher03.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course08.id,
      userId: teachers.teacher03.id,
    },
  });
  await prismaClient.teacherCourse.create({
    data: {
      courseId: courses.course09.id,
      userId: teachers.teacher03.id,
    },
  });
}

async function createCoursePeriodProgramme(
  courses: any,
  periods: any,
  programmes: any,
) {
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course01.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course02.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course03.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course11.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.PRIMER,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course12.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.ELECTIVE,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course13.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.PRIMER,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course14.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.ELECTIVE,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course15.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.ELECTIVE,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course16.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.PROJECT,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course17.id,
      periodId: periods.period01P01.id,
      programmeId: programmes.programme01.id,
      courseType: CourseType.PRIMER,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course04.id,
      periodId: periods.period02P01.id,
      programmeId: programmes.programme01.id,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course05.id,
      periodId: periods.period02P01.id,
      programmeId: programmes.programme01.id,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course06.id,
      periodId: periods.period02P01.id,
      programmeId: programmes.programme01.id,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course07.id,
      periodId: periods.period03P01.id,
      programmeId: programmes.programme01.id,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course08.id,
      periodId: periods.period03P01.id,
      programmeId: programmes.programme01.id,
    },
  });
  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course09.id,
      periodId: periods.period03P01.id,
      programmeId: programmes.programme01.id,
    },
  });

  await prismaClient.coursePeriodProgramme.create({
    data: {
      courseId: courses.course10.id,
      periodId: periods.period01P02.id,
      programmeId: programmes.programme02.id,
    },
  });
}

async function createStudentExamGrade(students: any, exams: any) {
  let grade = await prismaClient.grade.create({
    data: {
      currentValue: 18,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam01.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 15,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam02.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 12,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam03.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 6,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam04.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 9,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam05.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 7,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam06.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 16,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam08.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 18,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam09.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 17,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam10.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 14,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam11.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 12,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam12.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 18,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student01.id,
      examId: exams.exam13.id,
      gradeId: grade.id,
    },
  });
  // student 02
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 2,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.primeitstudent.id,
      examId: exams.exam01.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 7,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.primeitstudent.id,
      examId: exams.exam02.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 3,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.primeitstudent.id,
      examId: exams.exam03.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 6,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.primeitstudent.id,
      examId: exams.exam04.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 9,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.primeitstudent.id,
      examId: exams.exam05.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 7,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.primeitstudent.id,
      examId: exams.exam06.id,
      gradeId: grade.id,
    },
  });

  // student 03
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 1,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student03.id,
      examId: exams.exam01.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 5,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student03.id,
      examId: exams.exam02.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 3,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student03.id,
      examId: exams.exam03.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 4,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student03.id,
      examId: exams.exam04.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 2,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student03.id,
      examId: exams.exam05.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 3,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student03.id,
      examId: exams.exam06.id,
      gradeId: grade.id,
    },
  });

  // student 04
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 7,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student04.id,
      examId: exams.exam01.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 8,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student04.id,
      examId: exams.exam02.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 9,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student04.id,
      examId: exams.exam03.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 7,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student04.id,
      examId: exams.exam04.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 6,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student04.id,
      examId: exams.exam05.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 8,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student04.id,
      examId: exams.exam06.id,
      gradeId: grade.id,
    },
  });

  // student 05
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 7,
    },
  });

  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student05.id,
      examId: exams.exam03.id,
      gradeId: grade.id,
    },
  });
  grade = await prismaClient.grade.create({
    data: {
      currentValue: 8,
    },
  });
  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student05.id,
      examId: exams.exam04.id,
      gradeId: grade.id,
    },
  });

  grade = await prismaClient.grade.create({
    data: {
      currentValue: 8,
    },
  });

  await prismaClient.studentExamGrade.create({
    data: {
      userId: students.student05.id,
      examId: exams.exam07.id,
      gradeId: grade.id,
    },
  });
}

async function main() {
  // if (process.env.NODE_ENV !== 'development') {
  //   console.log('********');
  //   console.log(`SEED can not execute in ${process.env.NODE_ENV}`);
  //   console.log('********');
  //   return;
  // }

  const grants = await createAclGrant();

  const students = await createStudents();
  const teachers = await createTeachers();
  const staffs = await createStaffs();

  await createAclUserRole(grants, students, staffs, teachers);

  const programmes = await createProgrammes();

  const periods = await createPeriods(programmes);

  const cohorts = await createCohorts(programmes);

  const courses = await createCourses();

  await createCoursePeriodProgramme(courses, periods, programmes);

  await createCourseCohort(courses, cohorts, periods);

  await createStudentCohort(students, cohorts);

  await createStudentCoursePeriodProgramme(students, courses, periods);

  await createTeacherCourse(teachers, courses);

  const exams = await createExams(courses);

  await createStudentExamGrade(students, exams);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
