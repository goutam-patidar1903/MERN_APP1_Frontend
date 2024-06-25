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
                        <p key={workout._id} id={workout._id}>
                        <b>Title : </b>{workout.title} <b>Load : </b>{workout.load} <b>Reps : </b>{workout.reps}    
                        <span>{   formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</span>   
                        <span className="material-symbols-outlined" onClick={deleteHandler} id={workout._id}>delete</span>
                        </p> 
                        
                    )
                })
            }
        </div>
    )
}

export default WorkoutDetails