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
    <div className="flex-col justify-center">
    <h3 className="text-yellow-300 font-bold px-3 py-3 text-[25px] mb-3">Add New Workout</h3>
    <div className="border-2 border-yellow-300 rounded-md m-2 p-3 mb-10">
    <div className="h-auto w-[380px] bg-slate-300 rounded-md p-3">
    <form >
        <div>
        {
            error && <div className="text-[red] pb-2 font-bold text-lg">{error}</div>
        }
        </div>

        <div className="grid grid-cols-2 gap-2">
            <div className=""><label>Title : </label></div>
            <div className="">
                <input className="border-[1px] border-black w-[95%]"
                type="text"
                value={title}
                onChange={(ev)=>{setTitle(ev.target.value)}}
                style={emptyFields.includes('title')? {border: '2px solid red'} : {}}
                />
            </div>
            <div className=""><label>Load (in kg) : </label></div>
            <div className="">
                <input className="border-[1px] border-black w-[95%]"
                type="number"
            value={load}
            onChange={(ev)=>{setLoad(ev.target.value)}}
            style={emptyFields.includes('load')? {border: '2px solid red'} : {}}
                />
            </div>
            <div className=""><label>Reps : </label></div>
            <div className="">
                <input className="border-[1px] border-black w-[95%]"
                 type="number"
            value={reps}
            onChange={(ev)=>{setReps(ev.target.value)}}
            style={emptyFields.includes('reps')? {border: '2px solid red'} : {}}
                />
            </div>

        </div>

        <div className="block bg-gray-700 text-center mt-4 text-yellow-300 rounded 
        hover:bg-green-400 hover:text-black hover:cursor-pointer" onClick={onSubmitHandler} >Add Workout</div>
    </form>
    </div>
    </div>
    </div>
)
}

export default WorkoutAddForm;