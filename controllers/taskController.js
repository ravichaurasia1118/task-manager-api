const { __ } = require("i18n");
const { v4: uuidv4 } = require('uuid');
const TaskModal = require("../modules/taskModal");
const enumPriority = ['low', 'medium', 'high'];

exports.listPriorityLevelBasedFun = (req, res, next) => {
   try {
      var fetchTask = TaskModal.filter((n) => n?.id);
      let { level } = req.params;
      if (level) {
         fetchTask = fetchTask?.filter((n) => (n?.priority?.toLowerCase()) === level?.toLowerCase());
      }
      return res.status(200).json({ success: true, message: __("successFullDataFetch"), data: fetchTask, total: fetchTask.length })
   } catch (err) {
      next(err)
   }
}
exports.listFun = (req, res, next) => {
   try {
      var fetchTask = TaskModal.filter((n) => n?.id);
      let { status, sort } = req.query;
      if (status) {
         fetchTask = fetchTask.filter((n) => String(n?.status) === String(status));
      }
      if (['asx', 'desc']?.includes(sort)) {
         if (sort === 'asc') {
            fetchTask = fetchTask.sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt));
         } else {
            fetchTask = fetchTask.sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt));
         }
      }

      return res.status(200).json({ success: true, message: __("successFullDataFetch"), data: fetchTask, total: fetchTask.length })
   } catch (err) {
      next(err)
   }
}

exports.singleFun = (req, res, next) => {
   try {
      let { id } = req.params;
      if (!id) {
         return res.status(404).json({ success: false, message: __("idRequired") })
      }
      const fetchTask = TaskModal.find(({ id }) => id === id);
      if (!fetchTask) {
         return res.status(404).json({ success: false, message: __("taskNotFound") })
      }
      return res.status(200).json({ success: true, message: __("successFullDataFetch"), data: fetchTask })
   } catch (err) {
      next(err)
   }
}

exports.editFun =  (req, res, next) => {
   try {
      let { id } = req.params;
      const { title, description, status = false, priority } = req.body;
      if (!id) {
         return res.status(404).json({ success: false, message: __("idRequired") })
      }
      if (priority) {
         if (!enumPriority?.includes((priority?.toLowerCase()))) {
            return res.status(404).json({ success: false, message: __("valideTaskPriority") })
         }
      }

      var fetchTask = TaskModal.find(({ id }) => id === id);
      if (!fetchTask) {
         return res.status(404).json({ success: false, message: __("taskNotFound") })
      }
      if (title) {
         fetchTask = Object.assign(fetchTask, { title: title });
      }
      if (description) {
         fetchTask = Object.assign(fetchTask, { description: description });
      }
      if (status === true) {
         fetchTask = Object.assign(fetchTask, { status: true });
      }
      if (status === false) {
         fetchTask = Object.assign(fetchTask, { status: false });
      }
      if (priority) {
         fetchTask = Object.assign(fetchTask, { priority: priority?.toLowerCase() });
      }
      fetchTask = Object.assign(fetchTask, { updatedAt: new Date() });
      TaskModal.map((n) => n?.id === id ? fetchTask : n);
      return res.status(200).json({ success: true, message: __("successFullyUpdated"), data: fetchTask })
   } catch (err) {
      next(err)
   }
}

exports.createFun =  (req, res, next) => {
   try {
      let { title, description, status = false, priority } = req.body;
      if (!title) {
         return res.status(404).json({ success: false, message: __("titleRequired") })
      }
      if (!description) {
         return res.status(404).json({ success: false, message: __("descriptionRequired") })
      }

      if (priority) {
         if (!enumPriority?.includes((priority?.toLowerCase()))) {
            return res.status(404).json({ success: false, message: __("valideTaskPriority") })
         }
      }
      var data = ({
         id: uuidv4(),
         title: title,
         description: description,
         status: status ? true : false,
         createdAt: new Date(),
         updatedAt: new Date()
      })
      if (priority) {
         data = Object.assign(data, { priority: priority?.toLowerCase() });
      }
      TaskModal.push(data);
      return res.status(200).json({ success: true, message: __("successFullyCreated"), data: data })
   } catch (err) {
      next(err)
   }
}

exports.deleteFun = (req, res, next) => {
   try {
      let { id } = req.params;
      if (!id) {
         return res.status(404).json({ success: false, message: __("idRequired") })
      }
      const indexToDelete = TaskModal.findIndex((obj) => obj?.id === id);
      if (indexToDelete === -1) {
         return res.status(404).json({ success: false, message: __("taskNotFound") })
      }
      if (indexToDelete !== -1) {
         TaskModal.splice(indexToDelete, 1);
      }

      return res.status(200).json({ success: true, message: __("successFullyDeleted") })
   } catch (err) {
      next(err)
   }
}