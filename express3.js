const express = require('express');
const bodyParser = require('body-parser');
const { get } = require('http');
const app = express();
const fs = require('fs');
let array = [];
let regionName = [];
let subregionName = [];
let currency = [];
let read = JSON.parse(fs.readFileSync('country.json', 'utf-8'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/all', function (res, req) {
  res.sendFile(__dirname + '/country.json');
  res.status(200);
});
app.get('/country/:name', function (req, res) {
  for (i = 0; i < read.length; i++) {
    array.push(read[i].name);
    if (req.params.name.toLocaleLowerCase() === array[i].toLocaleLowerCase()) {
      res.json(read[i]);
    }
  }
  res.status(200);
  res.status(404).send('Not found');
});
app.get('/regions/:regionName', function (req, res) {
  for (i = 0; i < read.length; i++) {
    if (
      req.params.regionName.toLocaleLowerCase() ===
      read[i].region.toLocaleLowerCase()
    ) {
      regionName.push(read[i].name);
    }
  }
  res.status(200).send(regionName);
  res.status(404).send('Not found');
});

app.get('/subregion/:subregionName', function (req, res) {
  for (i = 0; i < read.length; i++) {
    if (
      req.params.subregionName.toLocaleLowerCase() ===
      read[i].subregion.toLocaleLowerCase()
    ) {
      subregionName.push(read[i].name);
    }
  }
  res.status(200).send(subregionName);
  res.status(404).send('Not found');
});

// ----------------------------step 12------------------------------------

app.get('/currencies/:currency', function (req, res) {
  for (i = 0; i < read.length; i++) {
    if (
      req.params.currency.toLowerCase() ===
      read[i].currencies[0].name.toLowerCase()
    ) {
      currency.push(read[i].name);
    }
  }
  res.status(200).send(currency);
  res.status(404).send('Not found');
});

// ----------------------------step 14-----------------------

app.put('/countries/:countryName', function (req, res) {
  let body = req.body;
  const keys = Object.keys(body);

  for (i = 0; i < read.length; i++) {
    array.push(read[i]);
    if (req.params.countryName.toLowerCase() === array[i].name.toLowerCase()) {
      for (j = 0; j < keys.length; j++) {
        console.log('KEEEEEEEEEEEYS =>', keys[j]);
        console.log('OBJETTTTTTTTTTT =>', Object.keys(read[i]));
        for (k = 0; k < keysRead.length; j++)
          if (keys[j] === Object.keys(read[i])) {
            console.log('dans le if ');
          }
      }
    }
  }
  // console.log(req.body);
  // res.send(req.body);
});

// ----------------------------delete------------------------
// app.delete('/countries/:countryName', function (res, req) {
//   for (i = 0; i < read.length; i++) {
//     array.push(read[i].name);
//     if (req.params.name.toLocaleLowerCase() === array[i].toLocaleLowerCase()) {
//       res.remove(read[i]);
//     }
//   }
//   console.log(read[i]);
//   res.status(200);
//   res.status(404).send('Not found');
// });

app.listen(3000, function () {
  console.log('app listening');
});
