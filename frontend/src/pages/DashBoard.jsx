import { useEffect, useState } from "react";
import { fetchSchools, fetchBranches, fetchClasses } from "../api/api";
// import SchoolList from "../components/SchoolList";
import BranchList from "../components/BranchList";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loadar";
// import BranchChart from "../components/BranchChart";
import SchoolSummary from "../components/SchoolSummary";
import ClassList from "../components/ClassList";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [schoolName, setSchoolName] = useState("");
  const [schools, setSchools] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // typing
  const [searchValue, setSearchValue] = useState(""); // actual search

  const [classes, setclasses] = useState([])
  const [branchName, setbranchName] = useState("")
  const [standard, setStandard] = useState("")

  const loadData = async (value = "") => {
    try {
      setLoading(true);

      const schoolRes = await fetchSchools(value);
      setSchools(schoolRes.data.data);

      const branchRes = await fetchBranches(value);
      setBranches(branchRes.data.data);
      toast.success(`Data come from ${branchRes.data.source}`)
      const classesRes = await fetchClasses(value)
      setclasses(classesRes.data.data)
console.log(classesRes)

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //  Load ALL data initially
  useEffect(() => {
    loadData(""); // default
  }, []);
  return (
    <div className="container">
      <h1>School Dashboard</h1>

      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSearch={() => {
          setSearchValue(inputValue);
          loadData(inputValue);
        }}
      />

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <h2>Data</h2> */}

          {/*  DEFAULT VIEW */}
          {!searchValue && <SchoolSummary data={schools} />}

          {/*  SEARCH RESULT */}
          {searchValue && branches.length > 0 && (
            <>
              <BranchList data={branches} />
              {/* <BranchChart data={branches} /> */}
            </>
          )}
          <ClassList data={classes} />
          {/*  NOT FOUND */}
          {searchValue && branches.length === 0 && (
            <p style={{ textAlign: "center", color: "red" }}>
              No data found for "{searchValue}"
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;