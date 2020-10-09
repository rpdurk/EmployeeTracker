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
      default:
        break;
    }
  })
};

// const addDepartment = async () => {
//   // console.log('works');
//   const answers = await inquirer.prompt(
//     {
//       type: 'input',
//       name: 'department',
//       message: 'Please input a department you want to add'
//     })
//     console.log(answers);
//      connection.query(
//     `INSERT INTO department (department_name)
//       VALUES ('${answers.department}');`, (error, result) => {
//         if (error) {
//           throw error;
//         } else {
//           console.log(result);
//         }
//       })
// };

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
  };

start();
