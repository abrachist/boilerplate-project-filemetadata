var express = require('express');
var cors = require('cors');
var multer  = require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const upload = multer({ dest: './uploads/' })

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// api route to upload a file
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if(req.file){
    res.json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size
    });
  } else {
    res.json({ "error": "No file uploaded" });
  }
  
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
