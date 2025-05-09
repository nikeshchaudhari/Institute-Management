import { useState } from "react";
import "../components/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddCourse = () => {
  const [courseName, setCourseName] = useState(" ");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(" ");
  const [startDate, setStartDate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");
  const [image, setImage] = useState(" ");
  const [imageUrl, setImageUrl] = useState(" ");

  const navigate = useNavigate()
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(price,image);
    
    const Data = new FormData();
    Data.append("courseName", courseName);
    Data.append("price", price);
    Data.append("description", description);
    Data.append("startDate", startDate);
    Data.append("endDate", endDate);
    Data.append("image", image);

    // console.log(courseName, price, description, startDate, endDate);
    const token = localStorage.getItem("token");
    console.log("Token:", token); // check value
    axios.post('http://localhost:9500/course/add-course', Data,{
        headers:{
          Authorization:'Bearer '+localStorage.getItem("token")
        }
      })
      .then(res=>{
        console.log(res);
        
        toast.success("Add Course Successfully...")
        navigate('/dashboard/allcourse')
      })
      .catch(err=>{
        console.log(err);
        toast.error("Something wrong....")
        
      })
      
  };
  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Add New Course</h1>
        <input required
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="Course Name"
        />
        <input required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="form-input"
          type="number"
          placeholder="Price"
        />
        <input required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="Description"
        />
        <input required
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="Start Date (DD-MM-YY)"
        />
        <input required
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="EndDate (DD-MM-YY)"
        />
        <input required
          onChange={fileHandler}
          className="form-input"
          type="file"
          placeholder="Files"
        />
        {imageUrl && <img src={imageUrl} width="50px" />}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddCourse;
