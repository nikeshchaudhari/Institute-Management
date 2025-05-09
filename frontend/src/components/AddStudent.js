
import { useEffect, useState } from "react";
import "../components/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate;
const AddStudent = () => {
  const[fullName, setFullName]=useState(" ")
const [email,setEmail]=useState(" ")
const [phone,setPhone]=useState(" ")
const [address,setAddress]=useState("")
const [courseId,setCourseId]=useState("")
const[image,setImage]= useState(null)
const[imageUrl,setImageUrl]= useState()
const [courseList,setCourseList]=useState([])
const submitHandler=(event)=>{
    event.preventDefault();
const formData = new FormData();
formData.append("fullName",fullName);
formData.append("email",email);
formData.append("phone",phone);
formData.append("address",address);
formData.append("courseId",courseId)
formData.append("image",image);

const token = localStorage.getItem("token")
console.log("token",token);


axios.post("http://localhost:9500/student/add-student",formData,{
    headers:{
        Authorization:'Bearer '+localStorage.getItem("token")
    }
   
})
.then(res=>{
    console.log(res);
    toast.success("Add Student..")
    navigate('/allstudent')

    
})
.catch(err=>{
    console.log(err);
    toast.error("error")
    
})
    
}
const fileHandler=(e)=>{
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    
}


useEffect(()=>{
getCourse();
},[])

const getCourse =()=>{

    axios.get("http://localhost:9500/course/all-course",{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
    })
    .then(res=>{
        setCourseList(res.data.allCourse)
        console.log(res.data.allCourses);
        
    })
    .catch(err=>{
        console.log(err);
        
    })
}

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Add New Student</h1>
        <input required
        onChange={e=>{
            setFullName(e.target.value)
        }}
          className="form-input"
          type="text"
          placeholder="FullName"
        />
        <input required
        onChange={e=>{
            setEmail(e.target.value)
        }}
          className="form-input"
          type="email"
          placeholder="email"
        />
         <input required
         onChange={e=>{
            setPhone(e.target.value)
         }}
          className="form-input"
          type="number"
          placeholder="phone"
        />
         <input required
         onChange={e=>{
            setAddress(e.target.value)
         }}
          className="form-input"
          type="text"
          placeholder="Address"
        />
        
       <select onChange={(e=>{
        setCourseId(e.target.value)
       })}>
        <option>Select Course</option>
        {
            courseList.map((course)=>(
                <option value={course._id}>{course.courseName}</option>
            ))
        }
       </select>
         <input required onChange={fileHandler}
          className="form-input"
          type="file"
        />
         {imageUrl && <img src={imageUrl} alt="preview" width="50px"/>}
        <button type="submit">Submit</button>
     
      </form>
    </div>
  );
};
export default AddStudent;
