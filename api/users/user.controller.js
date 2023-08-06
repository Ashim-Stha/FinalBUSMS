const {
  // create,
  // createLogin,
  // signIn,
  // getUser,
  // getLogin,
  // getUserById,
  // updateUser,
  // deleteUser,
  // getUserByEmail,
  registerEmployee,
  verifyEmployee,
  rejectEmployee,
  registerBus,
  assignCities,
  assignRoutes,
  assignRouteStages,
  assignCitiesInStages,
  assignBuses,
  getCities,
  getRoutes,
  getRouteStages,
  getCitiesInStages,
  getBuses,
  getEmployees,
  getBusAssignments,

  getPendingEmployees,
} = require("./user.service");

const pool = require("../../config/connectSql");
const path = require("path");

const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync, compare } = require("bcrypt");

module.exports = {
  // createUser: (req, res) => {
  //   const body = req.body;
  //   const salt = genSaltSync(10);
  //   body.password = hashSync(body.password, salt);

  //   create(body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });
  // },
  // createLogin: (req, res) => {
  //   const body = req.body;
  //   const salt = genSaltSync(10);
  //   body.password = hashSync(body.password, salt);

  //   createLogin(body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });
  // },
  assignCities: (req, res) => {
    const body = req.body;

    assignCities(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  assignRoutes: (req, res) => {
    const body = req.body;

    assignRoutes(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  assignRouteStages: (req, res) => {
    const body = req.body;

    assignRouteStages(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  assignCitiesInStages: (req, res) => {
    const body = req.body;

    assignCitiesInStages(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  registerEmployee: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    registerEmployee(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
      });
    });
  },
  verifyEmployee: (req, res) => {
    const id = req.params.id;

    verifyEmployee(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  rejectEmployee: (req, res) => {
    const id = req.params.id;

    rejectEmployee(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },
  registerBus: (req, res) => {
    const body = req.body;

    registerBus(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  assignBuses: (req, res) => {
    const body = req.body;

    assignBuses(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }

      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  signIn: (req, res) => {
    const { username, password } = req.body;
    pool.query(
      `select * from employees where employee_name=?`,
      [username],
      async (err, results, fields) => {
        if (err) return res.status(500).send("Database error");

        if (results.length === 0) {
          return res.status(401).json({
            success: false,
          });
        }

        const user = results[0];
        const pwdMatch = await compare(password, user.password);

        if (pwdMatch && user.verification_status === "verified") {
          res.status(200).json({
            success: true,
            message: "employee",
          });
          // res.sendFile(path.join(__dirname, "..", "..", "Site", "index.html"));
        } else if (pwdMatch && user.verification_status !== "verified") {
          res.status(401).json({
            success: false,
            message: "Not verified",
          });
        } else {
          res.status(401).json({
            success: false,
          });
        }
      }
    );
  },

  adminSignIn: (req, res) => {
    const { username, password } = req.body;
    pool.query(
      `select * from admin where username=?`,
      [username],
      async (err, results, fields) => {
        if (err) return res.status(500).send("Database error");

        if (results.length === 0) {
          return res.status(401).json({
            success: false,
          });
        }

        const user = results[0];
        const pwdMatch = await compare(password, user.password);

        if (pwdMatch) {
          res.status(200).json({
            success: true,
            message: "admin",
          });
          // res.sendFile(path.join(__dirname, "..", "..", "Site", "index.html"));
        } else {
          res.status(401).json({
            success: false,
          });
        }
      }
    );
  },
  getCities: (req, res) => {
    getCities((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getRoutes: (req, res) => {
    getRoutes((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getRouteStages: (req, res) => {
    getRouteStages((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getCitiesInStages: (req, res) => {
    getCitiesInStages((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getCitiesInStages: (req, res) => {
    getCitiesInStages((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getBuses: (req, res) => {
    getBuses((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getEmployees: (req, res) => {
    getEmployees((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getBusAssignments: (req, res) => {
    getBusAssignments((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  getPendingEmployees: (req, res) => {
    getPendingEmployees((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  // getLogin: (req, res) => {
  //   getLogin((err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }
  //     return res.status(200).json({
  //       data: results,
  //     });
  //   });
  // },

  // getUser: (req, res) => {
  //   getUser((err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }
  //     return res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });
  // },

  // getUserById: (req, res) => {
  //   const id = req.params.id;

  //   getUserById(id, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }

  //     if (!results) {
  //       return res.status(200).json({
  //         message: "Record not found",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });
  // },

  // updateUser: (req, res) => {
  //   const body = req.body;
  //   body.password = hashSync(body.password, genSaltSync(10));

  //   updateUser(body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }
  //     return res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });
  // },

  // deleteUser: (req, res) => {
  //   const id = req.body;
  //   deleteUser(id, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }
  //     return res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });
  // },

  // login: (req, res) => {
  //   const body = req.body;

  //   getUserByEmail(body.email, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         success: false,
  //         message: "Database connection error",
  //       });
  //     }

  //     if (!results) {
  //       return res.json({
  //         data: "Invalid email and password",
  //       });
  //     }

  //     const result = compareSync(body.password, results.password);
  //     if (result) {
  //       results.password = undefined;
  //       const jsontoken = sign({ result: results }, "qwe1234", {
  //         expiresIn: "1h",
  //       });

  //       return res.json({
  //         success: true,
  //         message: "login successful",
  //         token: jsontoken,
  //       });
  //     } else {
  //       return res.status(200).json({
  //         data: "Invalid email and password",
  //       });
  //     }
  //   });
  // },
};
