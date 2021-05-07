import React, { useState } from 'react';
import CreatePersonForm from './CreatePerson';
import PersonTable from './PersonTable';
import EditPersonForm from './EditPerson';

const CrudContainer = () => {
    //data 
    const initialFormState = [{ firstName: "", lastName: "", age: 0, phoneNumber: "", locState: "" }];

    //state
    const [persons, setPersons] = useState([]);
    const [currentPerson, setCurrentPerson] = useState(initialFormState);
    const [editing, setEdit] = useState(false)
    //crud ops
    const getPeople = () => {
        fetch('api/People')
            .then(res => res.json())
            .then(data => {
                setPersons(data);
            })
            .catch(error => console.log(error));
    };
    const updatingPerson = (person) => {
        setEdit(true);
        setCurrentPerson({ firstName: person.firstName, lastName: person.lastName, age: person.age, phoneNumber:person.phoneNumber, locState: person.locState, personID: person.personID})
    }
    const editPerson = (person) => {
        console.log('edit'+person);
        setEdit(false);
        const data = JSON.stringify(person, null, 2);
        console.log(data);
        fetch('api/Edit',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:data
        }).catch (error => console.log(error)); 
    }

    const deletePerson = (id) => {
        console.log(id);
        fetch('api/Delete/'+ id, {
        method: 'DELETE'    }).catch(error => console.log(error))
    };

    const createPerson = (person) => {
        const data = JSON.stringify(person, null, 2);
        console.log(data);
        fetch('api/Create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data  
        }).catch(error => console.log(error))
    };

    React.useEffect(function effectFunction() {
        fetch('api/People')
            .then(res => res.json())
            .then(data => {
                setPersons(data);
            })
            .catch(error => console.log(error));
    }, [persons]);
    



    //layout
    return (
        <div className='col'>
            <div className='row'>
                <PersonTable
                    deletePerson={deletePerson}
                    persons={persons}
                    getPeople={getPeople}
                    updatingPerson={updatingPerson}
                />
                </div>
            <div className="row">
                {editing ? (<EditPersonForm
                        editing={editing}
                        editPerson={editPerson}
                    updatingPerson={updatingPerson}
                        currentPerson={currentPerson}
                        setCurrentPerson={setCurrentPerson}/>
                ) : (
                        <CreatePersonForm
                    createPerson={createPerson}
                    setCurrentPerson={setCurrentPerson}
                    currentPerson={currentPerson}
                />
                )}
           </div>
        </div>
        )
}
export default CrudContainer;