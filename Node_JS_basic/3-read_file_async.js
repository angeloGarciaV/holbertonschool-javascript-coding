const fs = require('fs').promises;

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
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const students = parseDataToObject(data);

      let totalStudents = 0;
      Object.keys(students).forEach((key) => { totalStudents += students[key].length; });

      let output = `Number of students: ${totalStudents}`;
      console.log(output);

      Object.keys(students).forEach((key) => {
        const count = students[key].length;
        const list = students[key].join(', ');
        output += `\nNumber of students in ${key}: ${count}. List: ${list}`;
        console.log(`Number of students in ${key}: ${count}. List: ${list}`);
      });
      return output.trim();
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
