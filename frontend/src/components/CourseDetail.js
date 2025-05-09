import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
//   const params = useParams();
  const [course, setCourse] = useState({});
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    // console.log(params.id);
    // getCourseDetails();
  }, []);
  const getCourseDetails = () => {
    axios
      .get("http://localhost:9500/course-details/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data.Course);
        // setCourse(res.data.Course);

        // toast.success("All Course");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Something is wrong...");
      });
  };
  return <div></div>;
};

export default CourseDetail;
