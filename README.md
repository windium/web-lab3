# Web Lab 3 - University Course Management System

Assignment 3 for Web Programming (Fall 2026). The core logic of a university grading
system written in plain JavaScript, using asynchronous callbacks, ES6 classes, object
property descriptors and array methods.

## How to run

Requires Node.js 14 or newer (the project uses ES modules).

```bash
node main.js
```

## File organization

| File | Role |
| --- | --- |
| `models.js` | Defines the `Student` class. The `id` is created with `Object.defineProperty()` as non-writable and non-configurable. Has `addCourse(courseId, grade)` and `getAverage()`. |
| `database.js` | Simulates a slow database. `fetchStudents(callback)` waits 2 seconds with `setTimeout` and then passes the raw student array to the callback. |
| `analytics.js` | Calculation helpers: `calculateClassAverage(students, courseId)`, `findTopStudent(students)` (uses `.reduce()`), and the higher-order `filterStudents(students, criteriaFn)`. |
| `main.js` | Entry point. Fetches the raw data, turns it into `Student` instances, tests that the id cannot be changed, and prints the analytics report. |
| `package.json` | Sets `"type": "module"` so Node treats the `.js` files as ES modules. |

## Output

```
Fetching data from database...
Data received!

Testing Immutability:
Original ID: 1
Attempting to change ID to 999...
Final ID: 1 (Success: ID did not change)

--- Analytics Report ---
Class Average for Course 101: 73.33
Top Student: Ali (Average: 87.5)
Students in Course 102: Ali, Zeynep, Ahmet
```

The sample output in the assignment shows Zeynep (82.5) as the top student, but with the
given data Ali's average is (90 + 85) / 2 = 87.5, which is higher than Zeynep's
(70 + 95) / 2 = 82.5. The program prints the value the data actually produces.

## Challenges

- **Read-only id in strict mode.** ES modules always run in strict mode, so
  `students[0].id = 999` does not fail silently, it throws a `TypeError`. The assignment
  is wrapped in `try/catch` so the program can continue and show that the id is unchanged.
- **Using `import`/`export` in Node.** Without `"type": "module"` in `package.json`, Node
  reads `.js` files as CommonJS and rejects the `import` statements.
- **Callback timing.** Everything that needs the data has to live inside the
  `fetchStudents` callback, because code after the call runs before the 2-second timer
  finishes.
- **Class average per course.** The grades are nested inside each student's `courses`
  array, so they have to be flattened and filtered by `courseId` before averaging.
- **Sample output mismatch.** The expected top student did not match the data, as noted above.
