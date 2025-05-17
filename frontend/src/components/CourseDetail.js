import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const CourseDetail = () => {
  const params = useParams();
  const [course, setCourse] = useState({});
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(params.id);
    getCourseDetails();
  }, []);
  const getCourseDetails = () => {
    axios
      .get("http://localhost:9500/course/course-details/" + params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data.Course);
        setCourse(res.data.Course);
        setStudentList(res.data.Student);

        // toast.success("All Course");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Something is wrong...");
      });
  };
  return (
    <div className="course-main">
      <div className="course-wrapper">
        <img className="course-image" src={course.imageUrl} />
        <div className="course-details">
          <h4>{course.courseName}</h4>
          <p>Price : {course.price}</p>
          <p>StartDate : {course.startDate}</p>
          <p>endDate : {course.endDate}</p>
        </div>
        <div className="course-description-box">
          <div className="btn-container">
            <button onClick={()=>{
              navigate('/dashboard/addcourse',{state:{course}})
            }}className="primary-btn">Edit</button>
            <button className="secondary-btn">Delete</button>
          </div>
          <div className="course-description">
            <h3>Course Discription</h3>
            <p>{course.description}</p>
           
            
            
            </div>
          
          
          
        </div>

        {studentList && studentList.length > 0 && (
          <div className="std-list-container">
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
                {studentList.map((student) => (
                  <tr key={student._id}className="std">
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
    </div>
  );
};
export default CourseDetail;
