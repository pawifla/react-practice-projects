//this will be a table similar to the the PersonTable
//used to display the data form the dynamic form
//hidable
import React from 'react';
import {Table} from 'react-bootstrap';
import'./dDisplayTable.css'

const DisplayTable = props =>{

    const onDelete = async(id) =>{
        console.log(id);
        try{
            await props.deleteData(id);
        }catch(e){
            return (e) => console.log(e);
        }
    }
    const onEdit = async(data) =>{
        console.log(data);
        try{
            await props.updateData(data);
        }catch(e){
            return (e) => console.log(e);
        }
    }
    return(
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>State</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(data =>(
                        <tr key={data.id}>
                            <td><button className="btn btn-sm btn-light" onClick={()=>onEdit(data)}>Edit</button></td>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.age}</td>
                            <td>{data.cityName}</td>
                            <td>{data.stateName}</td>
                            <td><button className="btn btn-sm btn-light" onClick={()=>onDelete(parseInt(data.id,10))}>Delete</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default DisplayTable;