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
        <div>
       {allStudent && allStudent.length>0 && (
          <div className="std-list-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Profile Pic</th>
                  <th>Student Name</th>
                  <th> Phone</th>
                  <th> Email</th>
                </tr>
              </thead>
              <tbody>
                {allStudent.map((student) => (
                  <tr className="std">
                    <td>
                      <img src={student.imageUrl} />
                    </td>

                    <td>
                      <p> {student.fullName}</p>
                    </td>
                    <td>
                      {" "}
                      <p> {student.phone}</p>
                    </td>
                    <td>
                      {" "}
                      <p>{student.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
    )
}
export default AllStudent;