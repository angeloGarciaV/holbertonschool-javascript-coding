const fs = require('fs');

function parseDataToObject(data) {
  const lines = data.split('\n');
  const result = {};

  for (let i = 1; i < (lines.length - 1); i += 1) {
    const [firstname, , , field] = lines[i].split(',');

    if (field) {
      if (!result[field]) { result[field] = []; }
      result[field].push(firstname);
    }
  }

  return result;
}

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const students = parseDataToObject(data);

    let totalStudents = 0;
    Object.keys(students).forEach((key) => { totalStudents += students[key].length; });

    console.log(`Number of students: ${totalStudents}`);

    Object.keys(students).forEach((key) => {
      const count = students[key].length;
      const list = students[key].join(', ');
      console.log(`Number of students in ${key}: ${count}. List: ${list}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
