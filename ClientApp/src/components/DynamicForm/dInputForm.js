import React, {useState, useEffect} from 'react';

const DynamicInputForm = props => {
    const initialFormState = {firstName:"", lastName:"", age:0, cityName:"", stateName:"", houseName:""};
    const [homeOwner, setHomeOwner] = useState(initialFormState);
   
    useEffect(()=>{
        props.stateList();

    },[]);

    const handleInputChange = e =>{
        const {name, value} = e.target
        setHomeOwner({...homeOwner, [name]: value});
        if(name === homeOwner.stateName){
            props.cityList(value);
        }
    }

    return (
        <div className="container">
            <form>
                <h3>Add HomeOwner</h3>
                <div className="col">
                <label>First Name 
                <input type="text" required
                    className="form-control"
                    name="firstName"
                    value=""
                    onChange={handleInputChange}
                    placeholder="First Name"
                /></label>
                <label>Last Name 
                <input type="text" required
                    className="form-control"
                    name="lastName"
                    value=""
                    onChange={handleInputChange}
                    placeholder="Last Name"
                /></label>
                <label>Age
                <input type="number" required
                    className="form-control"
                    name="age"
                    value=""
                    onChange={handleInputChange}
                    placeholder="Age"
                /></label>
                <label>State
                <select className="form-control" value="" 
                onChange={handleInputChange}  required>
                    <option disabled selected>States</option>{
                    
                    props.statesList.map(state =>(
                        <option value={state.stateID}>{state.stateName}</option>
                    ))
                }
                </select></label>
                <label>City
                <select className="form-control" value="" 
                onChange={handleInputChange} required>{
                    //if(homeOwner.stateName != null){
                       // props.citiesList.map(city =>(
                       //     <option value={city}>{city}</option>
                       // ))
                    //}
                    
                }
                </select></label>
                  
                </div>

            </form>
        </div>
    );
}
export default DynamicInputForm;
// {props.statesList.map(state=>(
//                    <option>{state}</option>
//                ))
//                }
// <Form.Group controlId="formFirstName">
//                    <Form.Label>First Name</Form.Label>
//                    <Form.Control type="text" placeholder="First Name" />
//                </Form.Group>
//                <Form.Group controlId="formLastName">
//                    <Form.Label>Last Name</Form.Label>
//                    <Form.Control type="text" placeholder="Last Name" />
//                </Form.Group>
//                <Form.Group controlId="formAge">
//                    <Form.Label>Age</Form.Label>
//                    <Form.Control type="number" placeholder="Age" />
//                </Form.Group>
//               
//                <Form.Group controlId="formCity">
//                    <Form.Label>City</Form.Label>
//                    <Form.Control type="text" placeholder="City" />
//                </Form.Group