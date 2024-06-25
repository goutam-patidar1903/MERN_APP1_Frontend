import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import axios from "../axios";

const WorkoutAddForm=()=>{

    const {dispatch} =useWorkoutContext();

    const[title, setTitle]=React.useState('');
    const[load, setLoad]=React.useState('');
    const[reps, setReps]=React.useState('');
    const[error, setError]=React.useState('');
    const[emptyFields,setEmptyFields]=React.useState([]);

    const onSubmitHandler = async (ev)=>{
        ev.preventDefault();

        const workout = {title, load, reps}

        try
        {
            const response = await axios.post('/api/workouts',workout,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const dataJSON=response.data;
            if (response.status >= 200 && response.status < 300) {
                // Response is OK
                setTitle('');
                setLoad('');
                setReps('');
                setError('');
                setEmptyFields([]);
                console.log(`New workout added successfully: ${JSON.stringify(dataJSON)}`);
                dispatch({ type: 'CREATE_WORKOUT', payload: dataJSON });
              }
        }catch(error)
        {
            const errorJSON=error.response.data;
            setError(errorJSON.error);
            setEmptyFields(errorJSON.emptyFields);
        }
    }
return (
    <>
    <form onSubmit={onSubmitHandler}>
        <h3>Add New Workout</h3>
        {
            error && <h5 style={{color:'red'}}>{error}</h5>
        }
        <label>Title : </label>
        <input 
            type="text"
            value={title}
            onChange={(ev)=>{setTitle(ev.target.value)}}
            style={emptyFields.includes('title')? {border: '2px solid red'} : {}}
        /><br/>
    
        <label>Load : </label>
        <input 
            type="number"
            value={load}
            onChange={(ev)=>{setLoad(ev.target.value)}}
            style={emptyFields.includes('load')? {border: '2px solid red'} : {}}
        /><br/>

        <label>Reps : </label>
        <input 
            type="number"
            value={reps}
            onChange={(ev)=>{setReps(ev.target.value)}}
            style={emptyFields.includes('reps')? {border: '2px solid red'} : {}}
        /><br/>

        <button type="submit">Add Workout</button>
    </form>
    </>
)
}

export default WorkoutAddForm;