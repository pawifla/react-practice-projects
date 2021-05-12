//this will be a table similar to the the PersonTable
//used to display the data form the dynamic form
//hidable
import React from 'react';
import {Table} from 'react-bootstrap';

const DisplayTable = props =>{
    return(
        <Table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>State</th>
                    <th>House</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(data =>(
                        <tr key={data.id}>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.age}</td>
                            <td>{data.cityName}</td>
                            <td>{data.stateName}</td>
                            <td>{data.houseName}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default DisplayTable;