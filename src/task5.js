import fs from "node:fs";
import path from "node:path";
import { consola } from "consola";

const dataDir = path.join("./data");
5;
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  consola.success("Successfully created a data directory");
}

function showMenu() {
  consola.info("\nSelect the operation you want to perform:");
  consola.info("1. Add Data");
  consola.info("2. View File Names");
  consola.info("3. Delete Data");
  consola.info("4. Update Data");
  consola.info("5. Exit");
}

async function addData(rl) {
  const fileName = await rl.question("Enter a file name: ");
  const content = await rl.question("Insert file content: ");
  const filePath = path.join(dataDir, `${fileName}.js`);
  fs.writeFileSync(filePath, content);
  consola.info(`File ${fileName}.txt successfully added!`);
  await askForOperation(rl);
}

async function viewFileNames(rl) {
  const files = fs.readdirSync(dataDir);
  if (files.length === 0) {
    consola.info("No files available.");
  } else {
    consola.info("Available File Names:");
    files.forEach((file, index) => {
      const fileNameWithoutExt = path.parse(file).name;
      consola.info(`${index + 1}. ${fileNameWithoutExt}`);
    });
  }
  await askForOperation(rl);
}

async function deleteData(rl) {
  const files = fs.readdirSync(dataDir);
  if (files.length === 0) {
    consola.info("No files available to delete.");
    await askForOperation(rl);
    return;
  } else {
    consola.info("Available File Names:");
    files.forEach((file, index) => {
      const fileNameWithoutExt = path.parse(file).name;
      consola.info(`${index + 1}. ${fileNameWithoutExt}`);
    });
    const fileNumberInput = await rl.question(
      "Select the file number to delete: "
    );
    const fileNumber = parseInt(fileNumberInput, 10);

    if (isNaN(fileNumber) || fileNumber < 1 || fileNumber > files.length) {
      consola.warn("Invalid file number. Please try again.");
    } else {
      const selectedFile = files[fileNumber - 1];
      const filePath = path.join(dataDir, selectedFile);
      fs.unlinkSync(filePath);
      consola.success(`File ${selectedFile} successfully deleted!`);
    }
  }
  await askForOperation(rl);
}

async function updateData(rl) {
  const files = fs.readdirSync(dataDir);
  if (files.length === 0) {
    consola.info("No files available to edit.");
    await askForOperation(rl);
    return;
  }

  consola.info("Available File Names:");
  files.forEach((file, index) => {
    const fileNameWithoutExt = path.parse(file).name;
    consola.info(`${index + 1}. ${fileNameWithoutExt}`);
  });
  4;
  const fileNumberInput = await rl.question("Select the file number to edit: ");
  const fileNumber = parseInt(fileNumberInput, 10);

  if (isNaN(fileNumber) || fileNumber < 1 || fileNumber > files.length) {
    consola.warn("Invalid file number. Please try again.");
  } else {
    const selectedFile = files[fileNumber - 1];
    const filePath = path.join(dataDir, selectedFile);

    const currentContent = fs.readFileSync(filePath, "utf8");
    consola.info(`Current content of "${selectedFile}":\n`);
    consola.info(currentContent);

    const newContent = await rl.question(
      `\nEnter the new content for "${selectedFile}" (current content shown above): `
    );

    fs.writeFileSync(filePath, newContent);
    consola.success(`File "${selectedFile}" successfully updated!`);
  }
  await askForOperation(rl);
}

export async function askForOperation(rl) {
  showMenu();
  const choice = await rl.question("Enter your choice: ");
  switch (choice) {
    case "1":
      await addData(rl);
      break;
    case "2":
      await viewFileNames(rl);
      break;
    case "3":
      await deleteData(rl);
      break;
    case "4":
      await updateData(rl);
      break;
    case "5":
      consola.info("Terima kasih telah menggunakan aplikasi. Sampai jumpa!");
      rl.close();
      break;
    default:
      consola.warn("Pilihan tidak valid. Silakan masukkan 1, 2, 3, 4, atau 5.");
      await askForOperation(rl);
  }
}
