const prompt = require("prompt-sync")({ sigint: true });
const { error } = require("console");
//we need to install prompt-sync for console user input

//prompt-sync is used for making terminal input and sigint is set to true so that when user enters any value, this should not exit terminal

/************ Starting Todo list  **************/
let fs = require("fs");
let title = "";
let description = "";

function fileOperation(operation) {
  if (operation == "create") {
    createFile();
  } else if (operation == "read") {
    readFile();
  } else if (operation == "edit") {
    editFile();
  } else if (operation == "delete") {
    deleteFile();
  } else if (operation == "rename") {
    renameFile();
  }
}

//create and write file
function createFile() {
  title = prompt("Enter the title: ");
  description = prompt("Enter the description: ");
  console.log(`Title:${title}
   Description: ${description}`);
  fs.writeFileSync(
    `${title}.txt`,
    `title: ${title} \n description: ${description}`,
    function (err) {
      if (err) {
        console.log("error occured");
      }
      console.log(`${title}.txt file created successfully!`);
    }
  );
}

//read file
function readFile() {
  let fileName = prompt("Enter the file name to search: ");
  let data = fs.readFileSync(`${fileName}`);
  console.log(`'${fileName}' file data - `, data.toString());
}

//edit file
function editFile() {
  let fileName = prompt("Enter the file name to edit");
  let fileData = fs.readFileSync(`${fileName}`);
  console.log(`${fileName} existing description: `, fileData.toString());
  let updateData=prompt('Enter the decription to update: ');

  try {
    fs.appendFileSync(`${fileName}`, `${updateData}`, (error) => {
      if (error) throw error;
      fs.readFileSync(`${fileName}`, (error, updatedFileData) => {
        if (error) {
          console.log("error occurred: ", error);
        }
        console.log(`${fileName} updated description: ` + updatedFileData.toString());
      });
    });
  } catch (error) {
    console.log("error occured", error);
  }
}

// delete file
function deleteFile() {
  let fileName = prompt("Enter the file name to delete");
  try {
    fs.unlinkSync(`${fileName}`);
    console.log(`\n${fileName} deleted successfully!`);
  } catch (error) {
    console.log("error ocurred: ", error);
  }
}

//rename file
function renameFile() {
  let oldFileName = prompt("Enter the existing file name: ");
  let newFileName = prompt("Enter the new file name to rename: ");

  console.log(
    `\n Old file name: ${oldFileName} \n New file name: ${newFileName}`
  );

  if (fs.existsSync(`${oldFileName}`)) {
    fs.renameSync(`${oldFileName}`, `${newFileName}`);
    console.log(
      `\n${oldFileName} File renamed to ${newFileName} successfully!`
    );
  } else {
    console.log("\nFile not found");
  }
}

let choice;
do {
  console.log(`\n Enter your choice: 
            1) Enter 1 to create file
            2) Enter 2 to read file
            3) Enter 3 to edit file
            4) Enter 4 to delete file
            5) Enter 3 to edit file
            6) Enter 0 to exit 

`);
  choice = prompt("Enter the choice: ");

  switch (choice) {
    case "0":
      console.log("Exit from file crud menu");
      break;
    case "1":
      console.log("\nCreate file");
      fileOperation("create");
      break;
    case "2":
      console.log("\nRead file");
      fileOperation("read");
      break;
    case "3":
      console.log("\nEdit file");
      fileOperation("edit");
      break;
    case "4":
      console.log("\nDelete file");
      fileOperation("delete");
      break;
    case "5":
      console.log("\nRename file");
      fileOperation("rename");
      break;
    default:
      console.log("\nEnter the valid choice");
      break;
  }
  console.log("\nyour choice: ", choice);
} while (choice >= 1 && choice <= 6);
console.log("\nExit");
