import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
});

con.connect(function (err) {
  if (err) {
    console.log("connecting err");
  } else {
    console.log("Connected");
  }
});

export default con;
