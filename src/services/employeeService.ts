import * as employeeRepo from '../apis/EmployeeRepo';
import type { Department } from '../types/department';


// get departments
export function getDepartments(): Department[] {
    return employeeRepo.getDepartments();
}

// validate the employee information before creating a new employee
export function validateEmployee(firstName: string, lastName: string, departmentName: string) {

    const errors = {
        firstName: [] as string[],
        lastName: [] as string[],
        department: [] as string[]
    };

    // throw new error throws error right away and stops the function from executing any further.
    // use error.push to add error messages to execute all functions first and then return all.
    if (firstName.trim().length < 3) {
        errors.firstName.push("First names must have at least three characters.");
    }

    if (lastName.trim() === "") {
        errors.lastName.push("Last name cannot be empty.");
    }

    if (!employeeRepo.getDepartmentByName(departmentName)) {
        errors.department.push("Employee must be in an existing department.");
    }

    if(errors.firstName.length > 0 || errors.lastName.length > 0 || errors.department.length > 0) {
       return { isValid: false, errors };
    }

    const employee = employeeRepo.createEmployee(departmentName, firstName, lastName);

    return { isValid: true, errors, employee };
}

