import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [project, setProject] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Project:", project); // Log the category value
    axios
      .post("http://localhost:3000/auth/add_project", { project })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/project");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-25 border">
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="project">
              <strong>Project:</strong>
            </label>
            <input
              type="text"
              name="project"
              placeholder="Enter Project"
              onChange={(e) => setProject(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
