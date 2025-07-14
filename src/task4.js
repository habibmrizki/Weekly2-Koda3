const divideAndSort = (num) => {
  if (typeof num !== "number") return "Inputan harus berupa angka";
  const strNum = String(num);
  const result = strNum
    .split("0")
    .map((num) => num.split("").sort().join(""))
    .join("");
  return result;
};

export const runTask4 = () => {
  console.log(divideAndSort(5956560159466056));
};
