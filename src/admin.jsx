"use strict";
import React, { useEffect, useState } from "react";
import "./admin.css";
import {
  getAllCourseAPI,
  registerInstructorAPI,
  assignCourseAPI,
} from "../../services/api";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  let temp = 1;
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [courseList, setCourseList] = useState();
  const [pageCount, setpageCount] = useState(1);
  const [dataCount1, setdataCount1] = useState();
  const navigate = useNavigate();
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [instructorModalisOpen, setInstructorModalisOpen] = useState(false);
  useEffect(() => {
    const getrole = localStorage.getItem("role");
    if (getrole !== "admin") {
      navigate("/");
    }
    getAllCourse(temp);
  }, []);

  const paginationFn = (key) => {
    if (key === "next") {
      if (dataCount1 < 4) {
        alert("No More Data");
      } else {
        temp = temp + 1;
        getAllCourse(temp);
        setpageCount(temp);
      }
    }
    if (temp !== 0) {
      if (key === "previous") {
        temp = temp - 1;
        if (temp == 0) {
          temp = 1;
        }
        getAllCourse(temp);
        setpageCount(temp);
      }
    }
  };
  const getAllCourse = async (temp) => {
    console.log("pageNumber", temp);
    const response = await getAllCourseAPI({ page: temp });
    if (response.data.statusCode === 200) {
      setCourseList(response.data.message);
      setdataCount1(response.data.count);
    }
    if (response.data.statusCode === 403) {
      navigate("/");
    }
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleChangeA = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleOpen = () => {
    console.log("sdsad");
    setOpen(true);
  };
  const handleClose = () => {
    setInstructorModalisOpen(false);
    setInputs({});
  };
  const handleCloseA = () => {
    setAssignModalOpen(false);
    setInputs({});
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const Addinstructor = await registerInstructorAPI(inputs);
    if (Addinstructor.data.statusCode === 200) {
      alert("Instructor Added");
      setInputs({});
      setInstructorModalisOpen(false);
    }
    // const saveproduct = await saveProductApi(inputs);
    // alert(inputs);
  };
  const handleSubmitA = async (event) => {
    event.preventDefault();
    const assingCourse = await assignCourseAPI(inputs);
    console.log(assingCourse);
  
    if (assingCourse.data.statusCode === 400 || assingCourse.status === 400 || assingCourse === undefined) {
      alert(assingCourse.data.message);
    }
    else if (assingCourse.data.statusCode === 200) {
      alert("Course Assign");
      setInputs({});
      setAssignModalOpen(false);
    }
    // const saveproduct = await saveProductApi(inputs);
    // alert(inputs);
  };
  const logoutfn = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };
  return (
    <div>
      <div className="backround">
        <div className="logout">
          <button
            className="button-29"
            role="button"
            onClick={() => {
              logoutfn();
            }}
          >
            Logout
          </button>
        </div>
        <div className="tableArea">
          <div className="admintext">ADMIN PANEL</div>
          <div className="buttonRow">
            <div className="addcourse">
              <button
                className="button-29"
                role="button"
                onClick={() => navigate("/addcourse")}
              >
                ADD COURSE
              </button>
            </div>
            <div
              className="addinstructor"
              style={{ display: "grid", justifyContent: "end" }}
            >
              <button
                className="button-29"
                role="button"
                onClick={() => {
                  setInstructorModalisOpen(true);
                }}
              >
                ADD INSTRUCTOR
              </button>
            </div>
          </div>
          <div className="tablecontainer">
            <table>
              <tr>
                <th>Course Name</th>
                <th>Level </th>
                <th>Description</th>
                <th>Image</th>
                <th></th>
              </tr>

              {courseList?.length > 0 ? (
                courseList.map((data, i) => (
                  <tr>
                    <td>{data.coursename}</td>
                    <td>{data.level}</td>
                    <td>{data.description}</td>
                    <td>{data.image}</td>
                    <td>
                      <button
                        className="button-29"
                        role="button"
                        onClick={() => {
                          setAssignModalOpen(true);
                          setInputs((values) => ({
                            ...values,
                            ["coursename"]: data.coursename,
                          }));
                        }}
                      >
                        ASSIGN
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="nodata">NO DATA</div>
              )}
            </table>

            <div className="count"></div>
            <div className="pagination">
              <div className="previousButton">
                <button onClick={() => paginationFn("previous")}>
                  Previous -
                </button>
              </div>
              <div className="pageNumeber" style={{ color: "white" }}>
                {pageCount}
              </div>
              <div className="nextButton">
                <button onClick={() => paginationFn("next")}>Next +</button>
              </div>
            </div>
          </div>
        </div>

        <div className="createinsrtucote">
          <Modal open={instructorModalisOpen} onClose={handleClose}>
            <Box sx={style}>
              <div className="formheader">
                <div className="crossButton" onClick={() => handleClose()}>
                  <CancelIcon />
                </div>
                <div className="text newtext">NEW PRODUCT</div>
              </div>
              <div className="formbody1">
                <div className="body1">
                  <table style={{ display: "grid", gap: "8vh" }}>
                    <thead>Username</thead>
                    <thead>Password</thead>
                  </table>
                </div>
                <div className="body2">
                  <form onSubmit={handleSubmit} className="productform">
                    <label>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="username"
                        placeholder="Instructor Name"
                        value={inputs.username}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      <input
                        style={{ color: "black" }}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                      />
                    </label>
                    <div
                      className="button"
                      style={{ display: "grid", justifyContent: "end" }}
                    >
                      <input type="submit" className="submitButton" />
                    </div>
                  </form>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="assignmodal">
          <Modal open={assignModalOpen} onClose={handleCloseA}>
            <Box sx={style}>
              <div className="formheader">
                <div className="crossButton" onClick={() => handleCloseA()}>
                  <CancelIcon />
                </div>
                <div className="text newtext">NEW PRODUCT</div>
              </div>
              <div className="formbody1">
                <div className="body1">
                  <table style={{ display: "grid", gap: "8vh" }}>
                    <thead>Instructor Name</thead>
                    <thead>Date</thead>
                  </table>
                </div>
                <div className="body2">
                  <form onSubmit={handleSubmitA} className="productform">
                    <label>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        name="instructorname"
                        placeholder="Instructor Name"
                        value={inputs.instructorname}
                        onChange={handleChangeA}
                      />
                    </label>
                    <label>
                      <input
                        style={{ color: "black" }}
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={inputs.date}
                        onChange={handleChangeA}
                      />
                    </label>
                    <div
                      className="button"
                      style={{ display: "grid", justifyContent: "end" }}
                    >
                      <input type="submit" className="submitButton" />
                    </div>
                  </form>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Admin;
