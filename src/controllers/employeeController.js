import { getEmployees as getEmployeesService } from "../services/employeeService.js";

export const getEmployees = async (req, res) => {
  const employees = await getEmployeesService();
  console.log("🚀 ~ getEmployees ~ employees:", employees)
  res.json(employees);
  
};

