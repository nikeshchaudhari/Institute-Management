import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

const AllCourse = () => {
    const [courseList,setCourseList]= useState([]);

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
        setCourseList(res.data.allCourse)
        console.log(res.data.allCourse);
        // toast.success("All Course");
      })
      .catch((err) => {
        console.log(err);
        
        toast.error("Something is wrong...");
      });
  };
  return <div>
   {courseList.map((course)=>(
    <div key={course._id}>
{course.courseName}
    </div>
   ))}


  </div>;
};
export default AllCourse;
