const express = require('express');
const router = express.Router();
// const path = require('path');

// router.use('/', express.static('app', { redirect: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// router.get('*', function (req, res, next) {
//   res.sendFile(path.resolve('public/index.html'));
// });

module.exports = router;
