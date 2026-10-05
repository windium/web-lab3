// Average grade of all students who took the given course
export function calculateClassAverage(students, courseId) {
  const grades = students.flatMap((student) =>
    student.courses
      .filter((course) => course.courseId === courseId)
      .map((course) => course.grade)
  );

  if (grades.length === 0) return 0;
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

// Student with the highest overall average
export function findTopStudent(students) {
  if (students.length === 0) return null;
  return students.reduce((best, student) =>
    student.getAverage() > best.getAverage() ? student : best
  );
}

// Higher-order function: keeps the students for whom criteriaFn returns true
export function filterStudents(students, criteriaFn) {
  return students.filter((student) => criteriaFn(student));
}
