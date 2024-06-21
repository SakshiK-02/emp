import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch employees.");
      });
  }, []);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    // axios
    //   .delete("http://localhost:3000/auth/delete_employee/" + id)
    //   .then((result) => {
    //     if (result.data.Status) {
    //       window.location.reload();
    //     } else {
    //       alert(result.data.Error);
    //     }

    //if want alert but then adding new employee not proper id of employee
    if (window.confirm("Are you sure you want to delete ?")) {
      axios
        .delete("http://localhost:3000/auth/delete_employee/" + id)
        .then((result) => {
          if (result.data.Status) {
            window.location.reload();
          } else {
            alert(result.data.Error);
          }
        });
    }
    // });
  };

  // const handleDelete = (id) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this employee? "
  //   );
  //   if (confirmDelete) {
  //     axios
  //       .delete("http://localhost:3000/auth/delete_employee" + id)
  //       .then((result) => {
  //         if (result.data.Status) {
  //           setEmployee((employee) =>
  //             employee.filter((employee) => employee.id != id)
  //           );
  //         } else {
  //           alert(result.data.Error);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert("Failed to delete employee.");
  //       });
  //   }
  // };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              {/* <th>Project</th> */}
              {/* <th>Category_Id</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                {/* <td>{e.add_to_project}</td> */}
                {/* <td>{e.category_id}</td> */}
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
