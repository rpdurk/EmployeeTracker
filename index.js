const inquirer = require('inquirer');
const connection = require('./config/connection');

const start = () => {
  inquirer.prompt(
    {
      type: 'list',
      name: 'options',
      message: 'Welcome, please select an item to continue',
      choices:
        [
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'View a Department',
          'View a Role',
          'View an Employee',
          'Update an Employee\'s Role',
          'Update an Employee\'s Manager',
          'Delete a Department',
          'Delete a Role',
          'Delete an Employee',
          'View Department\'s salary budget',
          'Exit menu'
        ]
    }
  ).then((answers) => {
    console.log(answers);
    switch (answers.options) {
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'View a Department':
        viewDepartment();
        break;
      case 'View a Role':
        viewRole();
        break;
      case 'View an Employee':
        viewEmployee();
        break;
      case 'Delete a Department':
        deleteDepartment();
        break;
      case 'Delete a Role':
        deleteRole();
        break;
      case 'Exit menu':
        exit();
        break;
      default:
        break;
    }
  })
};

// *************************Add a Department Logic*****************************
const addDepartment = async () => {
  // console.log('works');
  const answers = await inquirer.prompt(
    {
      type: 'input',
      name: 'department',
      message: 'Please input a department you want to add'
    })
    console.log(answers);
    try {
      const result = await connection.query(
    `INSERT INTO department (department_name)
      VALUES ('${answers.department}');`) 
      console.log(result);
    } catch (err) {
      console.log("catch");
      throw err
    }
    start();
  };

// *************************Add a Role Logic******************************
  const addRole = async () => {
    // const sqlDepartments = 'INSERT INTO roles SET ?;';
    let departments = await connection.query(
      'SELECT id, department_name FROM department'
      );
    departments = departments.map(row => {
      const currentDepartment = { name: row.department_name, value: row.id }
      return currentDepartment;
    });
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Please input the title of the role.'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Please input the salary for this role.'
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does this role belong to?',
        choices: departments,
      }]);
      console.log(answers);
      try {
        const result = await connection.query(
      `INSERT INTO role (title, salary, department_id)
        VALUES ('${answers.title}', '${answers.salary}', '${answers.department}');`) 
        console.log(`'The role ${answers.title} was added successfully'`);
      } catch (err) {
        console.log("catch");
        throw err
      }
      start();
    };

// *************************Add an Employee Logic******************************
  // const addEmployee = async () => {
  //   console.log('works');
  //   let roles = await connection.query(
  //   `SELECT title, roles.id FROM roles;`
  //   );
  //   roles = roles.map(row => {
  //     const rolesActual = { name: row.title, value: row.id } 
  //     return rolesActual;
  //   });
  //   let managers = await connection.query(
  //     `SELECT employees.id, CONCAT (`first_Name`, ' ', `last_Name`) AS name FROM employees;`
  //   );
  //   managers = managers.map(row => {
  //     const managerActual = { name: row.name, value: row.id }
  //     return managerActual;
  //   });
  //   const { firstName, lastName, roles, managers } = await inquirer.prompt([
  //     {
  //       type: 'input',
  //       name: 'firstName',
  //       message: 'What is the employee\'s first name?'
  //     },
  //     {
  //       type: 'input',
  //       name: 'lastName',
  //       message: 'What is the employee\'s last name?'
  //     },
  //     {
  //       type: 'input',
  //       name: 'role_id',
  //       message: 'Which role does the new employee have?',
  //       choices: rolesActual
  //     },
  //     {
  //       type: 'input',
  //       name: 'manager_id',
  //       message: 'Who is the new employee\'s manager?',
  //       choices: managersActual
  //     }]);
  //     try {
  //       const result = await connection.query(
  //     `INSERT INTO employees (firstName, lastName, role_id, manager_id)
  //       VALUES ('${firstName}', '${lastName}', '${role_id}', '${manager}');`) 
  //       console.log(firstName);
  //     } catch (err) {
  //       console.log("catch");
  //       throw err
  //     }
  // start();
  //   };


// *************************View a Department Logic*****************************
const viewDepartment = async () => {
  // console.log('works');
  const result = await connection.query(
    'SELECT * FROM department;'
    ); 
      // console.log(result);
   console.table(result);
   start();
  };

// *************************View a Role Logic*****************************
const viewRole = async () => {
  // console.log('works');
  const result = await connection.query(
    'SELECT * FROM role;'
    ); 
      // console.log(result);
   console.table(result);
   start();
  };

  // *************************View a Employee Logic*****************************
const viewEmployee = async () => {
  const result = await connection.query(
    'SELECT * FROM employee;'
    ); 
   console.table(result);
   start();
  };

// *************************Delete a Department Logic*****************************
const deleteDepartment = async () => {
  let departments = await connection.query(
    'SELECT id, department_name FROM department'
    );
    departments = departments.map(row => {
      const currentDepartment = { name: row.department_name, value: row.id }
      return currentDepartment;
    });
  const answers = await inquirer.prompt(
    {
    type: 'list',
    name: 'department',
    message: 'Which department do you want to delete?',
    choices: departments,
    })
    try {
      const result = await connection.query(
    `DELETE FROM department WHERE id=${answers.department};`)
      console.log(`${answers.department} 'deleted'`);
    } catch (err) {
      console.log("catch");
      throw err
    }
    start();
  };

// *************************Delete a Role Logic*****************************
const deleteRole = async () => {
  let roles = await connection.query(
    'SELECT id, title FROM role'
    );
    roles = roles.map(row => {
      const currentRoles = { name: row.title, value: row.id }
      return currentRoles;
    });
  const answers = await inquirer.prompt(
    {
    type: 'list',
    name: 'role',
    message: 'Which role do you want to delete?',
    choices: roles,
    })
    try {
      const result = await connection.query(
    `DELETE FROM role WHERE id=${answers.role};`)
      console.log(`${answers.role} 'deleted'`);
    } catch (err) {
      console.log("catch");
      throw err
    }
    start();
  };

const exit = () => {
  connection.end();
};

start();
