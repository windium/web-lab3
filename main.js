import { Student } from "./models.js";
import { fetchStudents } from "./database.js";
import { calculateClassAverage, findTopStudent, filterStudents } from "./analytics.js";

console.log("Fetching data from database...");

fetchStudents((rawData) => {
  console.log("Data received!");

  const students = rawData.map(
    (record) => new Student(record.id, record.name, record.courses)
  );

  console.log("\nTesting Immutability:");
  const originalId = students[0].id;
  console.log(`Original ID: ${originalId}`);
  console.log("Attempting to change ID to 999...");
  try {
    // ES modules run in strict mode, so writing to a read-only property throws
    students[0].id = 999;
  } catch (error) {
    // expected: TypeError, the id stays as it was
  }
  const unchanged = students[0].id === originalId;
  console.log(
    `Final ID: ${students[0].id} (${unchanged ? "Success: ID did not change" : "Failure: ID changed"})`
  );

  console.log("\n--- Analytics Report ---");

  const average101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${average101.toFixed(2)}`);

  const topStudent = findTopStudent(students);
  console.log(`Top Student: ${topStudent.name} (Average: ${topStudent.getAverage()})`);

  const inCourse102 = filterStudents(students, (student) =>
    student.courses.some((course) => course.courseId === 102)
  );
  console.log(`Students in Course 102: ${inCourse102.map((student) => student.name).join(", ")}`);
});
