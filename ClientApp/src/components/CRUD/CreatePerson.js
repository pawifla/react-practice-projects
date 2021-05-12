import React, { useState } from 'react';
import './CreatePerson.css';
const CreatePersonForm = props => {
    //onclick for api call (api/create)
    //form with inputs and button
    const initialFormState = { firstName: "", lastName: "", age: 0, phoneNumber: "", locState: "" };
    const [person, setPerson] = useState(initialFormState)
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.createPerson(person);
            props.setCurrentPerson(person);
            setPerson(initialFormState);
            //make toasts work later
        } catch(e){
            return e => console.log(e);    
        }
    }
    const handleInputChange = e => {
        const { name, value } = e.target
        setPerson({...person, [name] : value})
    }
    return (
        <div className="container">
        <form onSubmit={onSubmit}>
                <h2>Create Person</h2>
                   <div className="row">
                    <div className="col">
                            First Name
                        </div>
                    <div className="col">
                        <input
                            type="text" required
                            name="firstName"
                            value={person.firstName}
                            onChange= {handleInputChange}
                            placeholder="First Name"
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Last Name
                            </div>
                        <div className="col">
                        <input
                            type="text" required
                            name="lastName"
                            value={person.lastName}
                            onChange = {handleInputChange}
                            placeholder="Last Name"
                        />
                            </div>
                    </div>
                    <div className="row">
                    <div className="col">
                            Age
                        </div>
                    <div className="col">
                        <input
                            type="number" required
                            name="age"
                            value={person.age}
                            onChange = {handleInputChange}
                            placeholder="Age"
                        />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col">
                            Phone Number
                        </div>
                    <div className="col">
                        <input
                            type="tel" required
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            name="phoneNumber"
                            value={person.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="ex. 000-000-0000"
                        />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col">
                            State
                        </div>
                    <div className="col" >
                        <input
                            type="text" required
                            name="locState"
                            value={person.locState}
                            onChange ={handleInputChange}
                            placeholder="State"
                        />
                        </div>
                    </div>
                    <div className="row last">
                        <button className="btn btn-outline-primary btn-sm" type="submit" value="Submit" >Submit</button>
                    </div>
            </form>
        </div>
        );
}
export default CreatePersonForm;