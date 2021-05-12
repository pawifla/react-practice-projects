import React from 'react';
import './PersonTable.css';

const PersonTable = props => {
    //need to figure dependency problem giving 'no func' errors
 
    const onDelete = async (id) => {
        console.log(id);
        try {
            await props.deletePerson(id);
        } catch (e) {
            return (e) => console.log(e);
        }
    }
    const onEdit = async (person) => {
        console.log(person);
        try {
            await props.updatingPerson(person)
        } catch(e){
            return (e) => console.log(e);
        }
    }
   

    return (
        <div >
            <h1>Table of People</h1>
            <p> This is a table of people and we are using react</p>
            <div className="scrollBox">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Phone Number</th>
                            <th>State</th>
                            <th></th>
                            <th></th>
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
                                <td><button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(person)}>Edit</button></td>
                                <td><button className="btn btn-outline-primary btn-sm" onClick={() => onDelete(parseInt(person.personID, 10))}>Delete</button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table> 
                </div>
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