import axios from "axios";
import { useEffect, useState } from "react";


const AllStudent=()=>{
    
    const[allStudent,setAllStudent]=useState([])
    useEffect(()=>{
getStudent();
    },[])
    const getStudent=()=>{
        axios.get("http://localhost:9500/student/all-student",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(res=>{
            setAllStudent(res.data.result)
            console.log(res.data.result);
    
            
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
   
    return(
        <div className="course-wrapper">
      {allStudent.map((student) => (
        <div className="course-box" key={student._id}>
          <img className="course-img" src={student.imageUrl} />
          {student.fullName}
        </div>
      ))}
    </div>
    )
}
export default AllStudent;