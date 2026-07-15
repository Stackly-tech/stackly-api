import { getEmployees as getEmployeesRepository } from "../repositories/employeeRepository.js";

export const getEmployees = () => {
  return getEmployeesRepository();
};