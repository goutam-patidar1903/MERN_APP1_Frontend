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
        <div className="flex flex-wrap justify-around bg-gray-600 pb-4">
            
           <div className="flex-col justify-center">
            <h2 className="text-yellow-300 font-bold px-3 py-3 text-[25px] mb-3">Records</h2>
            <div className="border-2 border-yellow-300 h-auto w-full rounded-md">
            {
                workouts && <WorkoutDetails workouts={workouts} />
            }
            </div>
            </div>
            <div className="flex-col justify-center">
                <WorkoutAddForm />
            </div>
        </div>
    )
}

export default Home