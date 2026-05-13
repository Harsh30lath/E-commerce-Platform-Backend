const asynchandler = require('express-async-handler');

const uploadSingle = asynchandler(async(req,res) => {
    if (!req.file) {
        return res.status(400).json({
            status: "Error",
            message: "No file uploaded"
        });
    }

    res.json({
        status: "Image uploaded successfully",
        imageUrl: req.file.location,
        fileName: req.file.key,
        size: req.file.size
    });
})

const uploadMultiple = asynchandler(async(req,res) => {
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            status: "Error",
            message: "No files uploaded"
        });
    }

    const uploadedFiles = req.files.map(file => ({
        url: file.location,
        key: file.key,
        size: file.size,
        mimeType: file.mimetype
    }));

    res.json({
        status: "Images uploaded successfully",
        count: uploadedFiles.length,
        images: uploadedFiles
    });
    
})

module.exports = {uploadSingle,uploadMultiple}