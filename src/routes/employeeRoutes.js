// import express from "express";
// import { getEmployees } from "../controllers/employeeController.js";

// const router = express.Router();

// router.get("/employees", getEmployees);

// export default router;

import express from "express";
import { getEmployees } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/employees", (req, res) => {
  console.log("NEW ROUTE EXECUTED");
  getEmployees(req, res);
});

export default router;