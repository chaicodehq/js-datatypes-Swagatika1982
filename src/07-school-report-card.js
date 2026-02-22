/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here

if (typeof student !== "object" || student === null || Array.isArray(student)) return null;
  const marks = student.marks;
  const name = student.name;  
  
  if( typeof name != "string" || name.trim() === "") return null;
  if( typeof marks != "object"  || marks === null ||  Array.isArray(marks)) return null;

  const subjects =Object.keys(marks);
  const marksSecured=Object.values(marks);
  const allEntries = Object.entries(marks);

  if (subjects.length === 0) return null;

  const Valid_marksSecured = marksSecured.every(
    (m) => (typeof m === "number" && Number.isFinite(m) && m >= 0 && m <= 100)
  );
  if (!Valid_marksSecured) return null;
  
   
const totalMarks =  marksSecured.reduce((tot, m) => tot + m,  0);
const percentage = parseFloat( ((totalMarks / (subjects.length * 100)) * 100).toFixed(2));
 
  let grade = "F";
  if (percentage >= 90 && percentage <= 100 ) grade = "A+";
  else if (percentage >= 80 && percentage < 90) grade = "A";
  else if (percentage >= 70 && percentage < 80) grade = "B";
  else if (percentage >= 60 && percentage < 70) grade = "C";
  else if (percentage >= 40 && percentage < 60) grade = "D";

const highestSubEntry = allEntries.reduce((highest, cur) => ( cur[1] > highest[1] ? cur : highest));
 
const lowestSubEntry = allEntries.reduce((lowest, cur) => ( cur[1] < lowest[1] ? cur : lowest));

const highestSubject = highestSubEntry[0];
const lowestSubject = lowestSubEntry[0];

const passedSubjects = allEntries  .filter((SubnMark) => {     
    const marks = SubnMark[1];
    return marks >= 40;
  })
  .map((SubnMark) => {
    const subject = SubnMark[0];
    return subject;
  });

const failedSubjects = allEntries  .filter((SubnMark) => {     
    const marks = SubnMark[1];
    return marks < 40;
  })
  .map((SubnMark) => {
    const subject = SubnMark[0];
    return subject;
  });

  return { name: name, 
    totalMarks: totalMarks, 
    percentage: percentage, 
    grade: grade, 
    highestSubject: highestSubject,
    lowestSubject: lowestSubject,
    passedSubjects: passedSubjects,
    failedSubjects:failedSubjects,
    subjectCount: allEntries.length } ;



}
