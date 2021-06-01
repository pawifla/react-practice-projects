//like the previous crud container, this will house the table and the input fields.
//conditional to show all fields. 
import React, {useState, useEffect} from 'react';
import DisplayTable from "./dDisplayTable";
import DynamicInputForm from "./dInputForm";

const DynamicDisplayContainer = () =>{
    //Data
    const initialFormState = [{/*Figure out the data and make an object here*/}]
    const stateObject = [{id: "", stateName:""}]
    const cityObject = [{stateID:"",cityName:"", cityID:0}]

    //State
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState(initialFormState);
    const [editing, setEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [statesList, setStatesList] = useState(stateObject);
    const [citiesList, setCitiesList] = useState(cityObject);
    //Crud Ops
    //selects data from DB for table
    const getData = ()=>{
      fetch('api/HomeOwnersReal')
          .then(res=> res.json())
          .then(data=>{
            setData(data);
            console.log(data);
          })
          .catch(error=>console.log(error));
        //getData api call
    }
    //gets list of states from DB
    const stateList = () =>{
        fetch('api/GetStates')
            .then(res=> res.json())
            .then(statesList=>{
                setStatesList(statesList);
            })
            .catch(error=>console.log(error));
    }
    //gets list of cities from DB based on state
    const cityList = (id) => {
      fetch('api/GenCities/'+id,
      {
      method: 'Post',
      headers:{'Content-Type': 'application/json'},
      body:id
    })
        .then(res=>res.json())
        .then(cityList =>{
          setCitiesList(cityList);
        })
        .catch(error=>console.log(error));
    }
//    const createData = () =>{
//
//    }
//    const updateData = () =>{
//
//    }
//    const deleteData = () =>{
//
//    }
useEffect(()=>{
  getData();
  stateList();
},[]);
    
    return(
        //header
        //table
        //inputform/editInputForm
        <div><DisplayTable
        data={data}
        getData={getData}/>
        <DynamicInputForm
        data={data}
        currentData = {currentData}
        showForm = {showForm}
        setCurrentData = {setCurrentData}
        setShowForm = {setShowForm}
        setStatesList = {setStatesList}
        statesList={statesList}
        stateList={stateList}
        citiesList = {citiesList}
        setCitiesList={setCitiesList}
        cityList={cityList}/>
        </div>
    )
}
export default DynamicDisplayContainer;