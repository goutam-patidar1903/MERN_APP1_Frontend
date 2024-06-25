import React from 'react';
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import axios from '../axios';

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutAddForm from '../components/WorkoutAddForm';

const fetchWorkout=()=>{
    var promise = new Promise(async (resolve , reject)=>{
    try
    {
        const response=await axios.get('/api/workouts');
        resolve(response.data);
    }catch(error)
    {
        reject("Unable to fetch"+error.message);
    }
    })
    return promise;
}

const Home = ()=>{
    const {workouts, dispatch}=useWorkoutContext();

    React.useEffect(()=>{
        
        fetchWorkout().then((workouts)=>{
            console.log(workouts)
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