require("dotenv").config();
const generateCode = (value) => {
  let output = "";
  value = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("");
  let merge = value + process.env.hostel;
  let length = merge.length;
  for (let i = 0; i < 3; i++) {
    let index =
      i === 2
        ? Math.floor(merge?.length / 2 + length / 2)
        : Math.floor(length / 2);
    output += merge.charAt(Math.floor(length / 2));
    length = index;
  }
  return `${value.charAt(0)}${output}`.toUpperCase();
};

export default generateCode;
