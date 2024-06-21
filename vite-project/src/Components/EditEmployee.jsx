// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const EditEmployee = () => {
//   const { id } = useParams();
//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     salary: "",
//     address: "",
//     category_id: "",
//     add_to_project: [],
//   });
//   const [category, setCategory] = useState([]);
//   const [project, setProject] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/category")
//       .then((result) => {
//         if (result.data.Status) {
//           setCategory(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:3000/auth/project")
//       .then((result) => {
//         if (result.data.Status) {
//           setProject(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));

//     axios
//       .get("http://localhost:3000/auth/employee/" + id)
//       .then((result) => {
//         setEmployee({
//           ...employee,
//           name: result.data.Result[0].name,
//           email: result.data.Result[0].email,
//           address: result.data.Result[0].address,
//           salary: result.data.Result[0].salary,
//           category_id: result.data.Result[0].category_id,
//           add_to_project: result.data.Result[0].add_to_project,
//         });
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleCheckboxChange = (e) => {
//     const project = e.target.value;
//     const isChecked = e.target.checked;

//     if (isChecked) {
//       setEmployee((prevEmployee) => ({
//         ...prevEmployee,
//         add_to_project: [...prevEmployee.add_to_project, project],
//       }));
//     } else {
//       setEmployee((prevEmployee) => ({
//         ...prevEmployee,
//         add_to_project: prevEmployee.add_to_project.filter(
//           (p) => p !== project
//         ),
//       }));
//     }
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   axios
//   //     .put("http://localhost:3000/auth/edit_employee/" + id, employee)
//   //     .then((result) => {
//   //       if (result.data.Status) {
//   //         navigate("/dashboard/employee");
//   //       } else {
//   //         alert(result.data.Error);
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   axios
//   //     .put("http://localhost:3000/auth/edit_employee/" + id, {
//   //       ...employee,
//   //       add_to_project: employee.add_to_project,
//   //     })
//   //     .then((result) => {
//   //       if (result.data.Status) {
//   //         navigate("/dashboard/employee");
//   //       } else {
//   //         alert(result.data.Error);
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:3000/auth/edit_employee/${id}`, {
//         ...employee,
//         add_to_project: employee.add_to_project,
//       })
//       .then((result) => {
//         if (result.data.Status) {
//           navigate("/dashboard/employee");
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-3">
//       <div className="p-3 rounded w-50 border">
//         <h3 className="text-center">Edit Employee</h3>
//         <form className="row g-1" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label htmlFor="inputName" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputName"
//               placeholder="Enter Name"
//               value={employee.name}
//               onChange={(e) =>
//                 setEmployee({ ...employee, name: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputEmail4" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control rounded-0"
//               id="inputEmail4"
//               placeholder="Enter Email"
//               autoComplete="off"
//               value={employee.email}
//               onChange={(e) =>
//                 setEmployee({ ...employee, email: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputSalary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputSalary"
//               placeholder="Enter Salary"
//               autoComplete="off"
//               value={employee.salary}
//               onChange={(e) =>
//                 setEmployee({ ...employee, salary: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputAddress" className="form-label">
//               Address
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               id="inputAddress"
//               placeholder="Enter address"
//               autoComplete="off"
//               value={employee.address}
//               onChange={(e) =>
//                 setEmployee({ ...employee, address: e.target.value })
//               }
//             />
//           </div>

//           {/* projects */}
//           <div className="form-group">
//             <label htmlFor="inputProject" className="form-label mt-2">
//               Project
//             </label>
//             <br />
//             <input
//               type="checkbox"
//               id="project1"
//               name="projects"
//               value="Machine Learning Project"
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="project1">Machine Learning Project </label>
//             <br />

//             <input
//               type="checkbox"
//               id="project2"
//               name="projects"
//               value="Web Development Project"
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="project2">Web Development Project </label>
//             <br />

//             <input
//               type="checkbox"
//               id="project3"
//               name="projects"
//               value="Android Project"
//               onChange={handleCheckboxChange}
//             />
//             <label htmlFor="project1">Android Project </label>
//             <br />
//           </div>

//           <div className="col-12 mt-4">
//             <button type="submit" className="btn btn-primary w-100">
//               Edit Employee
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditEmployee;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    add_to_project: [],
  });
  const [category, setCategory] = useState([]);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/project")
      .then((result) => {
        if (result.data.Status) {
          setProject(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/auth/employee/${id}`)
      .then((result) => {
        const selectedProjects = result.data.Result[0].add_to_project;
        setEmployee({
          ...result.data.Result[0],
          add_to_project: selectedProjects || [],
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  //2..
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

      // Ensure add_to_project is not left as undefined or null
      // return {
      //   ...prevEmployee,
      //   add_to_project: updatedProjects.length > 0 ? updatedProjects : [],
      // };

      return {
        ...prevEmployee,
        add_to_project: updatedProjects,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/edit_employee/${id}`, {
        ...employee,
        add_to_project: employee.add_to_project,
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

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              required
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              required
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              required
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter address"
              autoComplete="off"
              required
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          {/* Projects */}
          <div className="form-group">
            <label htmlFor="inputProject" className="form-label mt-2">
              Project
            </label>
            <br />
            <input
              type="checkbox"
              id="project1"
              name="projects"
              value="Machine Learning Project"
              onChange={handleCheckboxChange}
              checked={employee.add_to_project.includes(
                "Machine Learning Project"
              )}
            />
            <label htmlFor="project1">Machine Learning Project</label>
            <br />

            <input
              type="checkbox"
              id="project2"
              name="projects"
              value="Web Development Project"
              onChange={handleCheckboxChange}
              checked={employee.add_to_project.includes(
                "Web Development Project"
              )}
            />
            <label htmlFor="project2">Web Development Project</label>
            <br />

            <input
              type="checkbox"
              id="project3"
              name="projects"
              value="Android Project"
              onChange={handleCheckboxChange}
              checked={employee.add_to_project.includes("Android Project")}
            />
            <label htmlFor="project3">Android Project</label>
            <br />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
