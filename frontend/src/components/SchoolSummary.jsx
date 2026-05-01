import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SchoolSummary = ({ data }) => {

  const navigate = useNavigate()

  const handleclick = ()=>{
    navigate("/branch") 
    toast.success("got to Branches page")
  }
  console.log(handleclick)
  return (
    <div className="card-container">
      {data.map((school, index) => {
        // total students
        const totalStudents = school.standards.reduce(
          (sum, std) => sum + std.students,
          0
        );

        return (
          <div key={index} className="card">
            <h2>{school.schoolName}</h2>  
             <button id="switch" onClick={handleclick}>Total Branches: {data.length}</button>
            <p><strong>Total Students:</strong> {totalStudents}</p>
            <div className="grid">
              {school.standards.map((std, i) => (
                <div key={i} className="badge">
                  Class {std.standard}: {std.students}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SchoolSummary;