
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchClasses } from '../api/api'
import ClassList from '../components/ClassList'
import Loader from '../components/Loadar'

const ClassPage = () => {
    const [classes,setclasses] = useState([])
    const [loading,setLoading] = useState(true)
    const [branchName,setbranchName] = useState([])
    const [schoolName,setSchoolName] = useState([])
    const [standard,setStandard] = useState([])
    const navigate = useNavigate()

    const getStudentClassMarks = async()=>{
        try {
            const markRes = await fetchClasses("")
            console.log(markRes)
            // setclasses(markRes.data.data)
            setSchoolName(markRes.data.schoolName)
            setbranchName(markRes.data.branchName)
            setStandard(markRes.standard)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    // Load all branches on mount
      useEffect(() => {
        // Use async IIFE to avoid direct setState in effect
        (async () => {
          await getStudentClassMarks()
        })();
      }, []);
    
    const handleGoBack = ()=>{
        navigate("/branch")
    }
  return (
    <>
      <div className="container">
        <button id='switch' onClick={handleGoBack}>back to branch</button>

        <h1>All standard students</h1>

         {loading ? (  
        <Loader />
      ) : classes.length > 0 ? (
        <ClassList data={classes} />
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>
          No students found
        </p>
      )}
      </div>
    </>
  )
}

export default ClassPage
