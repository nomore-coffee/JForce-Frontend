import React ,{useEffect , useState} from 'react'
import { getAllCandidateAPI ,voteAPI} from "../../services/api";
import { useNavigate } from "react-router-dom";

const Userpage = () => {
    const [courseList , setcourseList] = useState([])
    const [votename , setVotename] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
      getVoter()

        },[])
        const getVoter = async()=>{
          const getVotername = await getAllCandidateAPI()
          console.log(getVotername.data.message)
          setcourseList(getVotername.data.message)
        }
        const submitVote= async()=>{
          let username = localStorage.getItem("name")
          let body ={
            candidateName : votename.name,
            candidateid : votename.id,
            username :username
          }
          const votesubmit = await voteAPI(body)
          if(votesubmit.data.statusCode===200){
            alert("Voted")
          }
          if(votesubmit.data.statusCode===400){
            alert(votesubmit.data.message)
          }
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
          <div className="admintext">Candidate PANEL</div>
          <div className="buttonRow">
          </div>
          <div className="tablecontainer">
            <table>
              <tr>
                <th>Candidate Name</th>
                {/* <th> Vote </th> */}
              </tr>
              {console.log(courseList.length)}
              {courseList?.length > 0 ? (
                courseList.map((data, i) => (
                  <tr>
                    <td>{data.candidateName} <input type='radio' name="votes" onClick={()=>setVotename({id:data._id , name:data.candidateName})}/></td>
                  </tr>
                ))
              ) : (
                <div className="nodata">NO DATA</div>
              )}
            </table>
            <div className="votebtn"
                style={{display:"grid", marginTop:"20px"}}
                >
                <button 
              className="button-29"
      s
                onClick={()=>submitVote()}>
                    Vote
                </button>
            </div>

            <div className="count"></div>
            {/* <div className="pagination">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Userpage
