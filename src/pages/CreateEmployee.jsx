import React from 'react'
import Form from '../components/Form'
import Navbar from '../components/Navbar'
import "../styles/CreateEmployee.css";

const CreateEmployee = () => {
  return (
    <> 
       <Navbar />
       <br />
       <h2 className='create'>Create Employee</h2>
       <br />
       <Form />
    </>

  )
}

export default CreateEmployee
