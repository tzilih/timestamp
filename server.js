const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/:date', (req, res) => {
  const date = req.params.date;
  const jsDate = new Date(date * 1000);
  const parsedDate = Date.parse(date);
  
  //check parameter to see if it's a valid date
  if (isNaN(parsedDate) && isNaN(jsDate.getTime())) {
    res.json({unix: null, natural: null});
  } 
  else if (isNaN(parsedDate)) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
    const naturalDate = months[jsDate.getMonth()] + ' ' + jsDate.getDate() + ', ' + jsDate.getFullYear();
    res.json({unix: date, natural: naturalDate})
  }
  else {
    res.json({unix: parsedDate/1000, natural: date})
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app started!")
});
