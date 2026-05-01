// import React from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BranchList = ({ data }) => {
  const navigate = useNavigate()
  
    const handleclick = ()=>{
      navigate("/class") 
      console.log("btn clicked")
      toast.success("classwise student")
    }
  return (
    <>
      {/* total branches */}
      <div className="card-container">
        {data.map((branch, index) => (
          <div key={index} className="card">
            <h2>{branch.branch_name}</h2>
            <div className="grid">

              {branch.classes.map((cls, i) => (
                <div onClick={handleclick} key={i} className="badge">
                  {cls.class}: {cls.students}
                </div>
              ))}

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BranchList;

