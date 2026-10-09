import { Guid } from "guid-typescript";
import { departmentData } from "../data/departments";
import type { Department } from "../types/department";
import type { Employee } from "../types/employee";


// currently we use a mock database to simulate the existence of the backend
// when we implement the backend we will replace these methods with calls to an API

// Get all departments items
export function getDepartments(): Department[] {
    return departmentData;
}

// Get department by name
export function getDepartmentByName(name: string): Department {
    const department = departmentData.find((d) => d.name === name) || departmentData[0];

    if(!department){
        throw new Error(`Department with name ${name} not found`);
    }
    return department;
}

// Get the employees of one department
export function getEmployeesByDepartmentName(departmentName: string): Employee[] {
    const department = getDepartmentByName(departmentName);

    if(!department){
        throw new Error(`Department with name ${departmentName} not found`);
    }

    return department.employees;
}

// get employee by id
export function getEmployeeById(employeeId: string): Employee {
    for (const department of departmentData) {
        const found = department.employees.find((e) => e.id === employeeId);
        if (found) {
            return found;
        }
    }
    throw new Error(`Employee with id ${employeeId} not found`);
}

// createEmployee function to add a new employee to a department
export function createEmployee(departmentName: string, firstName: string, LastName: string): Employee {

    const departmentPos = departmentData.findIndex((d) => d.name === departmentName);

    if(departmentPos === -1) {
        throw new Error(`Department with name ${departmentName} not found`);
    }
    
    const newEmployee: Employee = {
        id: Guid.create().toString(),
        firstName: firstName,
        lastName: LastName
    };

    departmentData[departmentPos].employees.push(newEmployee);

    return newEmployee;
}

