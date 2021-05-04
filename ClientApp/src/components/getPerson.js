import React, { useState } from 'react';

const PersonLine = () => {
    //need to figure dependency problem giving 'no func' errors

    const [persons, setPersons] = useState([]);

    React.useEffect(function effectFunction() {
        fetch('api/People')
            .then(res => res.json())
            .then(data => {
                setPersons(data);
            })
    }, []);

    console.log(persons);
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
                persons.map(persons => (
                <tr key={persons.personID}>
                    <td>{persons.firstName}</td>
                    <td>{persons.lastName}</td>
                    <td>{persons.age}</td>
                    <td>{persons.phoneNumber}</td>
                    <td>{persons.locState}</td>
                </tr>
                ))
                }
            </tbody>
        </table>
            </div>
    );
}

export default PersonLine;

//                persons.map(person => (/*table*/ ));