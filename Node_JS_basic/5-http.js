const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });

  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }

  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((response) => {
        res.write(response);
        res.end();
      })
      .catch((response) => {
        res.write(response.message);
        res.end();
      });
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
