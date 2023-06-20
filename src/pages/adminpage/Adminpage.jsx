import React, { useEffect, useState } from 'react'
import "./admin.css"
import { getAllVoteDetailsAdminAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Adminpage = () => {
    const [courseList , setcourseList] = useState([])
    useEffect(()=>{
      getVoter()
    },[])
    const navigate = useNavigate();

    const getVoter = async()=>{
      const getVotername = await getAllVoteDetailsAdminAPI()
      console.log(getVotername.data.message)
      setcourseList(getVotername.data.message)
    }
    const logoutfn = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      navigate("/");
    };
  return (
    <div>
        <div>
      <div className="backround">
        <div className="logout">
          <button
              className="button-29"
              role="button"
              style={{display:"grid" , justifyContent:"end",margin:"15px"}}
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
          </div>
          <div className="tablecontainer">
            <table>
              <tr>
                <th>Candidate Name</th>
                <th>Total Vote </th>
              </tr>
              {console.log(courseList.length)}
              {courseList?.length > 0 ? (
                courseList.map((data, i) => (
                  <tr>
                    <td>{data.candidateName}</td>
                    <td>{data.totalVote}</td>  
                  </tr>
                ))
              ) : (
                <div className="nodata">NO DATA</div>
              )}
            </table>

            
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Adminpage
