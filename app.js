const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

console.log('\nHi! Welcome to Employee Summary App. Answer some questions about your team, and an html will be create automatically.\n');
var questions = [
    {
        type: 'input',
        name: 'name',
        message: "Type the name of a member of your team: ",
        validate: function (value) {
            if (value.length >= 5) {
                return true;
            } else {
                return 'Please enter a valid name (At least 5 letters)';
            }
        }
    },
    {
        type: 'list',
        name: 'role',
        message: "What's the member's role ?",
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'email',
        message: "What's the member's e-mail ?",
        validate: function (value) {
            if (value.trim().length >= 5 && value.indexOf("@") != -1 && value.indexOf(".") != -1) {
                return true;
            }
            return "Please enter a valid email with at leat 10 characters and with '@' and '.'";
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What's the member's ID ?"
    },
];

var employees = [];
insertMember();

function insertMember() {
    inquirer.prompt(questions).then((answers) => {
        var lastQuestion = "";
        var fieldName = "";
        var employee;
        if (answers.role === "Manager") {
            lastQuestion = "What's the Office Number of this manager ?";
            fieldName = "officeNumber";
        } else if (answers.role === "Engineer") {
            lastQuestion = "What's the Github ID of this engineer ?";
            fieldName = "github";
        } else {
            lastQuestion = "What's the School of this intern ?";
            fieldName = "school";
        }
        lastQuestion = [
            {
                type: 'input',
                name: fieldName,
                message: lastQuestion
            },
            {
                type: 'list',
                name: 'insertAnotherMember',
                message: "Insert another member in this team ?",
                choices: ['Yes', 'No']
            }
        ];
        inquirer.prompt(lastQuestion).then((lastAnswer) => {
            if (answers.role === "Manager") {
                employee = new Manager(answers.name, answers.email, answers.id, lastAnswer.officeNumber);
            } else if (answers.role === "Engineer") {
                employee = new Engineer(answers.name, answers.email, answers.id, lastAnswer.github);
            } else {
                employee = new Intern(answers.name, answers.email, answers.id, lastAnswer.school);
            }
            employees.push(employee);
            if (lastAnswer.insertAnotherMember === "Yes") {
                insertMember();
            } else {
                var htmlContent = render(employees);
                try {
                    if (!fs.existsSync(OUTPUT_DIR)){
                        fs.mkdirSync(OUTPUT_DIR);
                    }
                    fs.writeFileSync(outputPath,htmlContent);
                    console.log("\nHTML file " + outputPath + " successfully created!\n");
                  } catch (err) {
                    console.log(err);                  }
                return;
            }
        });
    });
}