import { useState } from "react";
import styles from "../Features.module.css";
import { useFormInput } from "../../../hook/useFormInput";
import * as employeeService from "../../../services/employeeService";

export function Employees() {
    // each input's value + message
    const firstName = useFormInput();
    const lastName = useFormInput();
    const department = useFormInput();
    
    // state for the list of departments and employees
    const [departmentList, setDepartmentList] = useState(employeeService.getDepartments());

    const departmentListElement = departmentList.map((d) => {
        return <section key={d.id}>
            <h2>{d.name}</h2>
            <ul className={styles.employees}>
                {d.employees.map((e) => <li key={e.id}>
                    {e.firstName} {e.lastName}
                </li>)}
            </ul>
        </section>
    });

    const departmentDropdownInput = (
            <select
                value={department.value}
                onChange={e => department.setValue(e.target.value)}
            >
                <option value="">-- Select Department --</option>
                {
                    departmentList.map(d => {
                        return(
                            <option 
                                key={"opt" + d.id} 
                                value={d.name}>
                                    {d.name}
                                </option>
                        );
                    })
                }
            </select>
    );

    const handleEmployeeSubmit = () => {
        const result = employeeService.validateEmployee(
            firstName.value, 
            lastName.value, 
            department.value
        );

        firstName.validate(() => result.errors.firstName);
        lastName.validate(() => result.errors.lastName);
        department.validate(() => result.errors.department);

        if (result.isValid) {
            firstName.reset();
            lastName.reset();
            department.reset();

        setDepartmentList(employeeService.getDepartments());
        }
    }

    return(<>
        <section>
            <h1>Employees by Department</h1>
            {departmentListElement}
        </section>
        <section className={styles.input}>
            <h2>Add New Employee</h2>
            <form onSubmit={e => {
                e.preventDefault();
                handleEmployeeSubmit();
                }
            }>
                <div>
                    <label>
                        First Name: <input 
                            name="firstName" 
                            type="text" 
                            value = {firstName.value}
                            onChange={e => firstName.setValue(e.target.value)}
                        /> 
                    </label>
                    {firstName.errorMessages.map((msg, index) => <div key={index} className={styles.error}>{msg}</div>)}
                </div>
                <div>
                    <label>
                        Last Name: <input 
                            name="lastName" 
                            type="text" 
                            value = {lastName.value}
                            onChange={e => lastName.setValue(e.target.value)}
                            />
                    </label>
                    {lastName.errorMessages.map((msg, index) => <div key={index} className={styles.error}>{msg}</div>)}
                </div>
                <div>
                    <label>
                        Department: 
                            {departmentDropdownInput}
                    </label>
                    {department.errorMessages.map((msg, index) => <div key={index} className={styles.error}>{msg}</div>)}
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </section>
    </>);
}