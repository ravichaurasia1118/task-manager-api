var express = require('express');
const { __ } = require('i18n');
const router = express.Router();
router.get("/", async (req, res, next) => {
   return res.status(200).json({ success: true, message: __("welcomeMessage") })
});
module.exports = router