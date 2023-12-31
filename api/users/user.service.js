const pool = require("../../config/connectSql");

module.exports = {
  // create: (data, callBack) => {
  //   pool.query(
  //     `insert into registration(firstname,lastname,gender,email,password,number) values(?,?,?,?,?,?)`,
  //     [
  //       data.firstname,
  //       data.lastname,
  //       data.gender,
  //       data.email,
  //       data.password,
  //       data.number,
  //     ],
  //     (err, results, fields) => {
  //       if (err) return callBack(err);
  //       return callBack(null, results);
  //     }
  //   );
  // },
  // createLogin: (data, callBack) => {
  //   pool.query(
  //     `insert into login values(?,?)`,
  //     [data.username, data.password],
  //     (err, results, fields) => {
  //       if (err) return callBack(err);
  //       return callBack(null, results);
  //     }
  //   );
  // },
  assignCities: (data, callBack) => {
    pool.query(
      `insert into cities(city_name,garage) values(?,?)`,
      [data.city_name, data.garage],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
  assignRoutes: (data, callBack) => {
    pool.query(
      `insert into routes(route_name,passengers_num) values(?,?)`,
      [data.route_name, data.num],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
  assignRouteStages: (data, callBack) => {
    pool.query(
      `insert into routestages(route_id,stage_name) values(?,?)`,
      [data.route_id, data.stage_name],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
  assignCitiesInStages: (data, callBack) => {
    pool.query(
      `insert into citiesinstages(stage_id,city_id) values(?,?)`,
      [data.stage_id, data.city_id],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  registerEmployee: (data, callBack) => {
    pool.query(
      `insert into employees(employee_name,address,email,telephone_number,password,verification_status) values(?,?,?,?,?,?)`,
      [
        data.username,
        data.address,
        data.email,
        data.telephone_number,
        data.password,
        "pending",
      ],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  verifyEmployee: (data, callBack) => {
    pool.query(
      `update employees set verification_status=(?) where employee_id=(?)`,
      ["verified", data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  rejectEmployee: (data, callBack) => {
    pool.query(
      `delete from employees where employee_id=(?)`,
      [data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
  registerBus: (data, callBack) => {
    pool.query(
      `insert into buses(bus_registration_number,bus_type,bus_size) values(?,?,?)`,
      [data.reg_no, data.bus_type, data.bus_size],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  assignBuses: (data, callBack) => {
    pool.query(
      `insert into busassignments(bus_id,stage_id,employee_id) values(?,?,?)`,
      [data.bus_id, data.stage_id, data.employee_id],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  getCities: (callBack) => {
    pool.query(`select * from cities`, [], (err, results, fields) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  getRoutes: (callBack) => {
    pool.query(`select * from routes`, [], (err, results, fields) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  getRouteStages: (callBack) => {
    pool.query(`select * from routestages`, [], (err, results, fields) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  getCitiesInStages: (callBack) => {
    pool.query(`select * from citiesinstages`, [], (err, results, fields) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  getBuses: (callBack) => {
    pool.query(`select * from buses`, [], (err, results, fields) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  getEmployees: (callBack) => {
    pool.query(
      `select * from employees where verification_status=(?)`,
      ["verified"],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  getBusAssignments: (callBack) => {
    pool.query(
      ` select assignment_id,employee_id,employee_name,bus_id,stage_id,route_name,garage from busassignments natural join employees natural join routestages
    natural join routes natural join citiesinstages natural join cities`,
      [],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  getPendingEmployees: (callBack) => {
    pool.query(
      `select * from employees where verification_status=(?)`,
      ["pending"],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  deleteEmp: (data, callBack) => {
    pool.query(
      `delete from employees where employee_id=(?) and verification_status=(?)`,
      [data, "verified"],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  deleteBus: (data, callBack) => {
    pool.query(
      `delete from buses where bus_id=(?)`,
      [data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  deleteCities: (data, callBack) => {
    pool.query(
      `delete from cities where city_id=(?)`,
      [data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  deleteRoutes: (data, callBack) => {
    pool.query(
      `delete from routes where route_id=(?)`,
      [data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  deleteRouteStages: (data, callBack) => {
    pool.query(
      `delete from routestages where stage_id=(?)`,
      [data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  deleteCityStage: (data, callBack) => {
    pool.query(
      `delete from citiesinstages where stage_id=(?)`,
      [data],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  updateEmployee: (data, callBack) => {
    pool.query(
      `UPDATE employees
      SET employee_name = ?,
          address = ?,
          email = ?,
          telephone_number = ?,
          password = ?,
      WHERE employee_id = ?;
      `,
      [
        data.username,
        data.address,
        data.email,
        data.telephone_number,
        data.password,
        data.employee_id,
      ],
      (err, results, fields) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
  // getLogin: (callBack) => {
  //   pool.query(`select * from login`, [], (err, results, fields) => {
  //     if (err) return callBack(err);
  //     return callBack(null, results);
  //   });
  // },

  // getUser: (callBack) => {
  //   pool.query(`select * from registration`, [], (err, results, fields) => {
  //     if (err) return callBack(err);
  //     return callBack(null, results);
  //   });
  // },

  // getUserById: (data, callBack) => {
  //   pool.query(
  //     `select * from registration where id=?`,
  //     [data],
  //     (err, results, fields) => {
  //       if (err) return callBack(err);
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },

  // updateUser: (data, callBack) => {
  //   pool.query(
  //     `update registration set firstname=?,lastname=?,gender=?,email=?,password=?,number=? where id=?`,
  //     [
  //       data.firstname,
  //       data.lastname,
  //       data.gender,
  //       data.email,
  //       data.password,
  //       data.number,
  //       data.id,
  //     ],
  //     (err, results, fields) => {
  //       if (err) return callBack(err);
  //       return callBack(null, results);
  //     }
  //   );
  // },

  // deleteUser: (data, callBack) => {
  //   pool.query(
  //     `delete from registration where id=?`,
  //     [data.id],
  //     (err, results, fields) => {
  //       if (err) return callBack(err);
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },

  // getUserByEmail: (email, callBack) => {
  //   pool.query(
  //     `select * from registration where email=?`,
  //     [email],
  //     (err, results, fields) => {
  //       if (err) return callBack(err);
  //       return callBack(null, results[0]);
  //     }
  //   );
  // },
};
