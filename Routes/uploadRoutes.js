const express = require("express");
const router = express.Router();
const {uploadSingle,uploadMultiple} = require('../Controllers/uploadController');
const upload = require("../middleware/upload")

router.post('/upload-single',upload.single('image'),uploadSingle)
router.post('/upload-mutliple',upload.array('image',10),uploadMultiple)

module.exports = router;