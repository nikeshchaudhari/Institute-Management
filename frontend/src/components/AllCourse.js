import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCourse = () => {
  const [courseList, setCourseList] = useState([]);
const navigate = useNavigate( );
  useEffect(() => {
    getCourse();
  }, []);
  const getCourse = () => {
    axios
      .get("http://localhost:9500/course/all-course", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourseList(res.data.allCourse);
        console.log(res.data.allCourse);
        // toast.success("All Course");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Something is wrong...");
      });
  };
  return (
    <div className="course-wrapper">
      {courseList.map((course) => (
        <div onClick={()=>{
          navigate('/dashboard/course-detail/'+course._id)
        }} className="course-box" key={course._id}>
          <img className="course-img" src={course.imageUrl} />

          <h4 className="course-name">{course.courseName}</h4>
          <p className="course-price">Rs. {course.price}</p>
        </div>
      ))}
    </div>
  );
};
export default AllCourse;
