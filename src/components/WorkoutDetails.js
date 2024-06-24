import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const WorkoutDetails=({workouts})=>{

    const {dispatch} = useWorkoutContext();

    const deleteHandler=async (ev)=>{
        const id=ev.target.getAttribute('id');
    
        const response = await fetch('/api/workouts/'+id , {method : 'DELETE'})
        const json= await response.json();
        if(response.ok) {
            dispatch({type : 'DELETE_WORKOUT', payload: json})
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