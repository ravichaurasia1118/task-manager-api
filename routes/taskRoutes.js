var express = require('express');
const router = express.Router();
const taskController = require("../controllers/taskController");
//get   
router.get("/", taskController.listFun);

//get priority based
router.get("/priority/:level", taskController.listPriorityLevelBasedFun);
//get single
router.get("/:id/single", taskController.singleFun);
// create
router.post("/create", taskController.createFun);
//put
router.put("/:id/edit", taskController.editFun);
//delete
router.delete("/:id/delete", taskController.deleteFun); 
module.exports = router