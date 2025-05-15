import { useEffect, useState } from "react";
import "../components/style.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddCourse = () => {
  const [courseName, setCourseName] = useState(" ");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(" ");
  const [startDate, setStartDate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");
  const [image, setImage] = useState(" ");
  const [imageUrl, setImageUrl] = useState(" ");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      console.log(location.state.course);
      setCourseName(location.state.course.courseName)
      setPrice(location.state.course.price)
      setDescription(location.state.course.description)
      setStartDate(location.state.course.startDate)
      setEndDate(location.state.course.endDate)
      setImageUrl(location.state.course.imageUrl)
    }
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(price,image);

    const Data = new FormData();
    Data.append("courseName", courseName);
    Data.append("price", price);
    Data.append("description", description);
    Data.append("startDate", startDate);
    Data.append("endDate", endDate);
    // Data.append("image", image);
  if(image){
    Data.append("image",image);
  }

    // console.log(courseName, price, description, startDate, endDate);
    // const token = localStorage.getItem("token");
    // console.log("Token:", token); // check value

    if(location.state){
       axios
      .put("http://localhost:9500/course/"+location.state.course._id, Data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
           

        },
      })
      .then((res) => {
        console.log(res);

        toast.success(" Course updated Successfully...");
        navigate("/dashboard/course-detail/"+location.state.course._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong....");
      });
    }
    else{
       axios
      .post("http://localhost:9500/course/add-course", Data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);

        toast.success("Add Course Successfully...");
        navigate("/dashboard/allcourse");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong....");
      });
    }
   
  };
  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>{location.state?"Edit Course":"Add new Course"}</h1>
        <input value={courseName}
          required
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="Course Name"
        />
        <input value={price}
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="form-input"
          type="number"
          placeholder="Price"
        />
        <input value={description}
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="Description"
        />
        <input value={startDate}
          required
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="Start Date (DD-MM-YY)"
        />
        <input value={endDate}
          required
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          className="form-input"
          type="text"
          placeholder="EndDate (DD-MM-YY)"
        />
        <input
          required ={!location.state}
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
