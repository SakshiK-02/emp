//1..login and can see
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    // category_id: "",
    add_to_project: [],
  });

  // const [category, setCategory] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/auth/category")
  //     .then((result) => {
  //       if (result.data.Status) {
  //         setCategory(result.data.Result);
  //       } else {
  //         alert(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/project")
      .then((result) => {
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          // alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [isProjectSelected, setIsProjectSelected] = useState(false);

  //...2.
  const handleCheckboxChange = (e) => {
    const project = e.target.value;
    const isChecked = e.target.checked;

    setEmployee((prevEmployee) => {
      let updatedProjects = [...prevEmployee.add_to_project];

      if (isChecked && !updatedProjects.includes(project)) {
        updatedProjects.push(project);
      } else if (!isChecked && updatedProjects.includes(project)) {
        updatedProjects = updatedProjects.filter((p) => p !== project);
      }

      const hasSelectedProjects = updatedProjects.length > 0;
      setIsProjectSelected(hasSelectedProjects);

      return {
        ...prevEmployee,
        add_to_project: updatedProjects,
      };
    });
  };

  const navigate = useNavigate();
  //...1.
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3000/auth/add_employee", employee)
  //     .then((result) => {
  //       if (result.data.Status) {
  //         navigate("/dashboard/employee");
  //       } else {
  //         console.log(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  //...2.

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_employee", {
        ...employee,
        add_to_project: JSON.stringify(employee.add_to_project),
      })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleCheckboxChange = (e) => {
  //   const project = e.target.value;
  //   const isChecked = e.target.checked;

  //   if (isChecked) {
  //     setEmployee((prevEmployee) => ({
  //       ...prevEmployee,
  //       add_to_project: [...prevEmployee.add_to_project, project],
  //     }));
  //   } else {
  //     setEmployee((prevEmployee) => ({
  //       ...prevEmployee,
  //       add_to_project: prevEmployee.add_to_project.filter(
  //         (p) => p !== project
  //       ),
  //     }));
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1 " onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label mt-2">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter name"
              required
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label mt-2">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              required
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label mt-2">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter password"
              required
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label mt-2">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              required
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label mt-2">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              required
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          {/* projects */}
          <div className="form-group">
            <label htmlFor="inputProject" className="form-label mt-2" required>
              Project
            </label>
            <br />
            <input
              type="checkbox"
              id="project1"
              name="projects"
              value="Machine Learning Project"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="project1">Machine Learning Project </label>
            <br />

            <input
              type="checkbox"
              id="project2"
              name="projects"
              value="Web Development Project"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="project2">Web Development Project </label>
            <br />

            <input
              type="checkbox"
              id="project3"
              name="projects"
              value="Android Project"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="project1">Android Project </label>
            <br />
          </div>

          {/* <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div> */}
          {/* 
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="checkbox"
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              <select>Development</select>
            </input>
          </div> */}
          {/*
          <div className="col-12">
            <label htmlFor="inputProject" className="form-label mt-2">
              Project
            </label>
            <input
              type="checkbox"
              className="form-control rounded-0"
              id="inputProject1"
              value="Machine learning project"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
            <label htmlFor="project1">Machine Learning Project</label>
          </div> */}
          {/* <div className="col-12">
            <label className="form-label">Projects</label>
            <div>
              {project.map((project) => (
                <div key={project.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`project-${project.id}`}
                    value={project.id}
                    checked={employee.projects.includes(project.id)}
                    onChange={() => handleCheckboxChange(project.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`project-${project.id}`}
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
          {/* 
          <div className="col-12">
            <label htmlFor="project" className="form-label">
              Project
            </label>
            <select
              name="project"
              id="project"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, add_to_project: e.target.value })
              }
            >
              {project.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div> */}
          <button className="btn btn-primary w-100 rounded-0 mb-3 mt-4">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
