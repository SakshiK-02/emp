//apis for admin
import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";

const router = express.Router();

router.options("/adminlogin", cors()); // Handle preflight for this route

//this is if we have admin table
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) {
      // console.error("Query Error:", err); // Log the error for debugging
      return res.json({ Status: false, Error: "Query Error: " });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) {
      console.error("Query Error:", err); // Log the error for debugging
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true });
  });
});

router.post("/add_project", (req, res) => {
  const sql = "INSERT INTO project (`name`) VALUES (?)";
  con.query(sql, [req.body.project], (err, result) => {
    if (err) {
      console.error("Query Error:", err); // Log the error for debugging
      return res.json({ Status: false, Error: "Query Error: " + err.message });
    }
    return res.json({ Status: true });
  });
});

router.get("/project", (req, res) => {
  const sql = "SELECT * FROM project";
  con.query(sql, (err, result) => {
    if (err) {
      // console.error("Query Error:", err); // Log the error for debugging
      return res.json({ Status: false, Error: "Query Error: " });
    }
    return res.json({ Status: true, Result: result });
  });
});

// router.post("/add_employee", (req, res) => {
//   const sql = `INSERT INTO employee
//     (name,email,password, address, salary, add_to_project:JSON.stringyfy(add_to_project))
//     VALUES (?)`;
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" });
//     const values = [
//       req.body.name,
//       req.body.email,
//       hash,
//       req.body.address,
//       req.body.salary,
//       // req.body.category_id,
//       req.body.add_to_project,
//     ];
//     con.query(sql, [values], (err, result) => {
//       if (err) return res.json({ Status: false, Error: err });
//       return res.json({ Status: true });
//     });
//   });
// });

router.post("/add_employee", (req, res) => {
  const sql = `INSERT INTO employee
    (name, email, password, address, salary, add_to_project)
    VALUES (?, ?, ?, ?, ?, ?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Hashing Error" });

    // Convert array to JSON string
    const add_to_project = JSON.stringify(req.body.add_to_project);

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      add_to_project, // Store JSON string in the database
    ];

    con.query(sql, values, (err, result) => {
      if (err) return res.json({ Status: false, Error: err.message });
      return res.json({ Status: true });
    });
  });
});

// router.post("/add_employee", (req, res) => {
//   const {
//     name,
//     email,
//     password,
//     salary,
//     address,
//     category_id,
//     add_to_project,
//   } = req.body;
//   {
//     const employeequery =
//       "INSERT INTO employee (name, email,password, salary, address, category_id, add_to_project) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
//     con.query(
//       employeequery,
//       [name, email, password, salary, address, category_id, add_to_project],
//       (err, result) => {
//         if (err) {
//           return res.status(500).json({ Status: false, Error: err.message });
//         }
//         const employeeId = result.insertId;
//         const ProjectQueries = project.map((projectId) => {
//           return new Promise((resolve, reject) => {
//             const projectQuery = "INSERT INTO project(id, name) VALUES(?,?);";
//             con.query(projectQuery, [employeeId, name], (err, result) => {
//               if (err) {
//                 reject(err);
//               } else {
//                 resolve(result);
//               }
//             });
//           });
//         });

//         Promise.all(ProjectQueries)
//           .then(() => {
//             res.json({ Status: true });
//           })
//           .catch((err) => {
//             res.status(500).json({ Status: false, Error: err.message });
//           });
//       }
//     );
//   }
// });

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//.done but spread letters
//  router.put("/edit_employee/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `UPDATE employee
//               SET name = ?, email = ?, salary = ?, address = ?, add_to_project = ?
//               WHERE id = ?`;
//   const values = [
//     req.body.name,
//     req.body.email,
//     req.body.salary,
//     req.body.address,
//     JSON.stringify(req.body.add_to_project),
//     id,
//   ];
//   con.query(sql, values, (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" + err });
//     return res.json({ Status: true, Result: result });
//   });
// });

//..mariadb error
// router.put("/edit_employee/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `UPDATE employee
//               SET name = ?, email = ?, salary = ?, address = ?, add_to_project = ?
//               WHERE id = ?`;
//   const values = [
//     req.body.name,
//     req.body.email,
//     req.body.salary,
//     req.body.address,
//     req.body.add_to_project, // Ensure add_to_project is passed as an array of strings
//     id,
//   ];
//   con.query(sql, values, (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" + err });
//     return res.json({ Status: true, Result: result });
//   });
// });

//..3.can edit but not prevously selected projects
// router.put("/edit_employee/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `UPDATE employee
//               SET name = ?, email = ?, salary = ?, address = ?, add_to_project = ?
//               WHERE id = ?`;

//   // Convert array to JSON string
//   const add_to_project = JSON.stringify(req.body.add_to_project);

//   const values = [
//     req.body.name,
//     req.body.email,
//     req.body.salary,
//     req.body.address,
//     // JSON.stringify(req.body.add_to_project),
//     add_to_project,
//     id,
//   ];
//   con.query(sql, values, (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error: " + err });
//     return res.json({ Status: true, Result: result });
//   });
// });

//.4..
// router.put("/edit_employee/:id", (req, res) => {
//   const id = req.params.id;
//   const { name, email, salary, address, add_to_project } = req.body;

//   // Serialize add_to_project array to JSON
//   const add_to_project_json = JSON.stringify(add_to_project);

//   const sql = `UPDATE employee
//               SET name = ?, email = ?, salary = ?, address = ?, add_to_project = ?
//               WHERE id = ?`;
//   const values = [name, email, salary, address, add_to_project_json, id];

//   con.query(sql, values, (err, result) => {
//     if (err) {
//       return res.json({ Status: false, Error: "Query Error: " + err });
//     }
//     return res.json({ Status: true, Result: result });
//   });
// });

//....can deselect but not update in table
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, salary, address, add_to_project } = req.body;

  // Convert add_to_project to JSON string
  const add_to_project_string = JSON.stringify(add_to_project);

  const sql = `UPDATE employee
              SET name = ?, email = ?, salary = ?, address = ?, add_to_project = ?
              WHERE id = ?`;
  const values = [name, email, salary, address, add_to_project_string, id];

  con.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

//......can deselct but deletes the entire record of employee

// router.put("/edit_employee/:id", (req, res) => {
//   const id = req.params.id;
//   const { name, email, salary, address, add_to_project } = req.body;

//   // Convert add_to_project to JSON string
//   const add_to_project_string = JSON.stringify(add_to_project);

//   // SQL to update employee details
//   const updateEmployeeSql = `UPDATE employee
//                              SET name = ?, email = ?, salary = ?, address = ?, add_to_project = ?
//                              WHERE id = ?`;
//   const employeeValues = [
//     name,
//     email,
//     salary,
//     address,
//     add_to_project_string,
//     id,
//   ];

//   // SQL to delete projects not in add_to_project
//   // const deleteProjectsSql = `DELETE add_to_project FROM employee
//   //  WHERE id = ? AND add_to_project NOT IN (?)`;
//   const deleteProjectsSql = `ALTER employee DROP  add_to_project
//         WHERE id = ? AND add_to_project NOT IN (?)`;

//   const deleteProjectsValues = [id, add_to_project];

//   con.beginTransaction((err) => {
//     if (err) {
//       return res.json({
//         Status: false,
//         Error: "Transaction Begin Error: " + err,
//       });
//     }

//     con.query(updateEmployeeSql, employeeValues, (err, updateResult) => {
//       if (err) {
//         con.rollback(() => {
//           return res.json({
//             Status: false,
//             Error: "Update Employee Query Error: " + err,
//           });
//         });
//       }

//       // Delete projects not in add_to_project
//       // con.query(
//       //   deleteProjectsSql,
//       //   deleteProjectsValues,
//       //   (err, deleteResult) => {
//       //     if (err) {
//       //       con.rollback(() => {
//       //         return res.json({
//       //           Status: false,
//       //           Error: "Delete Projects Query Error: " + err,
//       //         });
//       //       });
//       //     }

//       con.commit((err) => {
//         if (err) {
//           con.rollback(() => {
//             return res.json({
//               Status: false,
//               Error: "Transaction Commit Error: " + err,
//             });
//           });
//         }

//         return res.json({
//           Status: true,
//           Result: { updateResult, deleteResult },
//         });
//       });
//     });
//   });
// });
// });

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

// router.get("/admin_count", (req, res) => {
//   const sql = "select count(id) as admin from admin";
//   con.query(sql, [id], (err, result) => {
//     if (err) return res.json({ Status: false, Error: "Query Error" + err });
//     return res.json({ Status: true, Result: result });
//   });
// });

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  // res.clearCookie('token')
  return res.json({ Status: true });
});

// router.get('/admin_records', (req, res) => {
//     const sql = "select * from admin"
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"+err})
//         return res.json({Status: true, Result: result})
//     })
// })

export { router as adminRouter };
