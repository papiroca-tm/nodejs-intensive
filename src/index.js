import express from 'express';
import cors from 'cors';



import canonize from './canonize.js'

const app = express();
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

app.use(cors());
app.use(bodyParser.json());

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
/* todo : доделать и пересдать */
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


/*
 * task2C
 * */
app.get('/task2C', (req, res) => {
  const url = req.query.username;
  res.send(canonize(url));
});


import getColor from './getColor';
/*
 * task2D
 * */
app.get('/task2D', (req, res) => {
  res.send(getColor(req));
});


/*
 * task3A
 * */
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

const arrDevice = ["board", "ram", "os", "floppy", "hdd", "monitor", "length", "height", "width", undefined];
const arrProperty = ["vendor", "model", "cpu", "image", "video", "volume", "pins", "size", undefined];
const arrParameter = ["model", "hz", "vendor", "size", "volume", undefined];

app.get('/task3A/:device?/:property?/:parameter?/:somefield?', (req, res) => {
  const device = req.params.device;
  const property = req.params.property;
  const parameter = req.params.parameter;
  const somefield = req.params.somefield;

  if (device == "volumes") {
    var C = 0;
    var D = 0;
    var i = pc.hdd.length - 1;
    for (i; i >= 0; i--) {
      if (pc.hdd[i]["volume"] == "C:") {
        C += pc.hdd[i]["size"];
      } else {
        D += pc.hdd[i]["size"];
      }
    }
    C = C.toString();
    D = D.toString();
    return res.json({
      "C:":C+"B",
      "D:":D+"B",
    });
  }

  if (somefield) {
    return res.status(404).send('Not Found');
  }

  if ((arrDevice.indexOf(device) == -1) || (arrProperty.indexOf(property) == -1 && property.match('[0-9]*') == '') || (arrParameter.indexOf(parameter) == -1) || (parseInt(req.params.property) >= pc.hdd.length)) {
    return res.status(404).send('Not Found');
  }

  if (device) {
    if (property) {
      if (parameter) {
        return res.json(pc[device][property][parameter]);
      }
      return res.json(pc[device][property]);
    }
    return res.json(pc[device]);
  } else {
    return res.json(pc);
  }
});






