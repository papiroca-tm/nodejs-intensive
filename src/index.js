import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(3000, () => {
  console.log('app listening on port 3000');
});

/*
* task2A
* */
app.get('/task2A', (req, res) => {

  const a = req.query.a || 0;
  const b = req.query.b || 0;
  const result = parseInt(a) + parseInt(b);
  res.send(result.toString());

});

/*
 * task2B
 * */
app.get('/task2B', (req, res) => {

  const fullname = req.query.fullname;
  const arr = fullname.split(' ');

  let result = 'Invalid fullname';
  const len = arr.length;



  if (len == 1 && arr[0] !== '') {
    const sName = arr[0];
    result = `${sName}`;
  } else if  (len == 2) {
    const sName = arr[1];
    const fName = char2UCase(arr[0]);
    result = `${sName} ${fName}`;
  } else if (len == 3) {
    const sName = arr[2];
    const fName = char2UCase(arr[0]);
    const tName = char2UCase(arr[1]);
    result = `${sName} ${fName} ${tName}`;
  }

  // arr.forEach(word => {
  //   console.log(word.match( /^[a-zа-яё]+$/ig ));
  //   if (word.match( /^[a-zа-яё]+$/ig ) == null) {
  //     result = 'Invalid fullname';
  //   }
  // });

  res.send(result.toString());

});

function char2UCase(str) {
  return (str) ? str.charAt(0).toUpperCase() + '.': '';
}


