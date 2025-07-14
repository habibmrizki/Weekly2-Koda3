import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import consola from "consola";

import { runTask1 } from "./src/task1.js";
import { runTask2 } from "./src/task2.js";
import { runTask3 } from "./src/task3.js";
import { runTask4 } from "./src/task4.js";
import { askForOperation as runTask5 } from "./src/task5.js";

const rl = readline.createInterface({ input, output });

async function showMenu() {
  consola.info("\nSelect the task you want to run:");
  consola.info("1. Fetch Data");
  consola.info("2. Get Data From Server");
  consola.info("3. Get Data From API");
  consola.info("4. Divide Sort");
  consola.info("5. Program File");
  consola.info("6. Exit");
}

async function main() {
  while (true) {
    await showMenu();
    const choice = await rl.question("Enter your choice: ");
    consola.info("Loading...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    switch (choice) {
      case "1":
        await runTask1();
        break;
      case "2":
        await runTask2();
        break;
      case "3":
        await runTask3();
        break;
      case "4":
        runTask4();
        break;
      case "5":
        await runTask5(rl);
        break;
      case "6":
        rl.close();
        return;
      default:
        consola.warn("Invalid option!");
    }
  }
}

main();

rl.on("close", () => {
  consola.success("Thank you for using app!");
  process.exit(0);
});
