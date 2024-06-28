import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import axios from '../axios';

const WorkoutDetails=({workouts})=>{

    const {dispatch} = useWorkoutContext();

    const deleteHandler=async (ev)=>{
        const id=ev.target.getAttribute('id');
        
        try
        {
            const response = await axios.delete('/api/workouts/'+id);
            const json=response.data;
            console.log(json);
            dispatch({type:"DELETE_WORKOUT" , payload : json});
        }catch(error)
        {
            console.log(error.response.data.error);
        }
    }

    return (
        <div>
            {
                workouts.map((workout)=>{
                    return (
                        <div key={workout._id} id={workout._id} className="flex py-3 ps-11 pe-7 bg-slate-300 rounded-md m-2 h-auto w-auto">
                        
                        <div className="w-full">
                        <p><b>Title : </b>{workout.title} </p>
                        <p><b>Load : </b>{workout.load} </p>
                        <p> <b>Reps : </b>{workout.reps} </p>
                        <p><b>Updated : </b>{   formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
                        </div>

                        <div className="material-symbols-outlined ps-8 hover:text-red-700 hover:cursor-pointer" onClick={deleteHandler} id={workout._id}>delete</div>

                        </div> 
                        
                    )
                })
            }
        </div>
    )
}

export default WorkoutDetails