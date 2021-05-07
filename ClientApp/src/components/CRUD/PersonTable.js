import React, { useState } from 'react';

const PersonTable = props => {
    //need to figure dependency problem giving 'no func' errors
 
    const onDelete = async (id) => {
        console.log(id);
        try {
            await props.deletePerson(id);
        } catch (e) {
            (e) => console.log(e);
        }
    }
    const onEdit = async (person) => {
        console.log(person);
        try {
            await props.updatingPerson(person)
        } catch(e){
            (e) => console.log(e);
        }
    }
   

    return( 
        <div>
            <h1>Table of People</h1>
            <p> This is a table of people and we are using react</p>
        <table className='table'>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Phone Number</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>{
                props.persons.map(person => (
                <tr key={person.personID}>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.age}</td>
                    <td>{person.phoneNumber}</td>
                    <td>{person.locState}</td>
                    <td><a onClick={() => onEdit(person)}>Edit</a></td>
                    <td><a onClick={() => onDelete(parseInt(person.personID))}>Delete</a></td>
                </tr>
                ))
                }
            </tbody>
        </table>
            </div>
    );
}

export default PersonTable;

//maybe for nulls example try later
//export class EmployeeData {  
//    employeeId: number = 0;
//    name: string = "";  
//    gender: string = "";  
//    city: string = "";  
//    department: string = "";  
//}; 