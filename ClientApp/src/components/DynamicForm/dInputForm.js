import React, {useState, useEffect} from 'react';

const DynamicInputForm = props => {
    const initialFormState = {firstName:"", lastName:"", age:0, cityName:"", stateName:"", houseName:""};
    const [homeOwner, setHomeOwner] = useState(initialFormState);
   
    useEffect(()=>{
        props.stateList();
    },[]);
    let currentStateID;
    const handleInputChange = e =>{
        const {name, value} = e.target
        setHomeOwner({...homeOwner, [name]: value});
        if(name === "stateName"){
            currentStateID = e.target.value;
            getCities(currentStateID);
        }
    }
    const getCities = async (e) =>{
        //e.preventDefault();
        console.log(e);
        try{
            await props.cityList(e);
        }
        catch(e){
            return e=> console.log(e)
        }
    }

    return (
        <div className="container">
            <form>
                <h3>Add HomeOwner</h3>
                <div className="row">
                <label>First Name 
                <input type="text" required
                    className="form-control"
                    name="firstName"
                    value={homeOwner.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                /></label>
                <label>Last Name 
                <input type="text" required
                    className="form-control"
                    name="lastName"
                    value={homeOwner.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                /></label>
                <label>Age
                <input type="number" required
                    className="form-control"
                    name="age"
                    value={homeOwner.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                /></label>
                <label>State
                <select className="form-control" value={homeOwner.stateName} name="stateName"
                onChange={handleInputChange}  required>
                    <option disabled selected>States</option>{
                    props.statesList.map(state =>(
                        <option 
                        value={state.id}
                        >{state.stateName}</option>
                    ))
                }
                </select></label>
                <label>City
                <select className="form-control" value={homeOwner.cityName} 
                onChange={handleInputChange} required>{
                   props.citiesList.map(city => (
                       <option value={city.cityName}>{city.cityName}</option>
                   )) 
                }
                </select></label>
                </div>
            </form>
        </div>
    );
}
export default DynamicInputForm;
