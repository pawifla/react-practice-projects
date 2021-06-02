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
    const onSubmit = async (e) => {
            e.preventDefault();
        try {
            await props.createData(homeOwner);
            props.setCurrentData(homeOwner);
            setHomeOwner(initialFormState);
        } catch (e) {
            return e => console.log(e);
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h3>Add Person</h3>
                <div className="row">
                <label>First Name 
                <input type="text" required
                    className="form-control"
                    name="firstName"
                    value={homeOwner.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                /></label>
                </div>
                <br/>
                <div className="row">
                <label>Last Name 
                <input type="text" required
                    className="form-control"
                    name="lastName"
                    value={homeOwner.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                /></label>
                </div>
                <br/>
                <div className="row">
                <label>Age
                <input type="number" required
                    className="form-control"
                    name="age"
                    value={homeOwner.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                /></label>
                </div>
                <br/>
                <div className="row">
                <label>State
                <select placeholder="Cities" className="form-control" value={homeOwner.stateName} name="stateName"
                onChange={handleInputChange}  required>
                    <option key="" defaultValue>States</option>{
                    props.statesList.map(state =>(
                        <option 
                        key={state.id}
                        value={state.id}
                        >
                            {state.stateName}
                        </option>
                    ))
                }
                </select></label>
                </div>
                <br/>
                <div className="row">
                <label>City
                <select  placeholder="Cities" className="form-control" value={homeOwner.cityName} name="cityName"
                onChange={handleInputChange} required>
                    <option key="" defaultValue>Cities</option> {
                   props.citiesList.map(city => (
                       <option 
                       key={city.CityID} 
                       value={city.CityID}>
                           {city.cityName}
                       </option>
                   )) 
                }
                </select></label>
                </div>
                <br/>
                <div className="row">
                    <button className="btn btn-light" type="submit" value="Submit">Create</button>
                </div>
            </form>
        </div>
    );
}
export default DynamicInputForm;
