import React from 'react';
import {useWorkoutContext} from '../hooks/useWorkoutContext'

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutAddForm from '../components/WorkoutAddForm';

const fetchWorkout=()=>{
    var promise = new Promise(async (resolve , reject)=>{
    const response = await fetch('/api/workouts');
    
    if(response.ok)
    {    
       const workouts=await response.json(); 
       resolve(workouts)
    }
    
    reject('Unable to fetch data');
    })
    return promise;
}

const Home = ()=>{
    const {workouts, dispatch}=useWorkoutContext();

    React.useEffect(()=>{
        
        fetchWorkout().then((workouts)=>{
            dispatch({type: 'SET_WORKOUTS',payload: workouts})
        },(error)=>{
            console.log(error);
        })
    } , [dispatch])

    return (
        <div>
            <h2>Home</h2>
            <div>
            {
                workouts && <WorkoutDetails workouts={workouts} />
            }
            </div>
            <div>
                <WorkoutAddForm />
            </div>
        </div>
    )
}

export default Home