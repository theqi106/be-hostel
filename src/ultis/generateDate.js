import moment from "moment";

const formatDate = (timeObject) => {
  let day =
    timeObject.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObject.getDay() + 1}`;
  let date = `${timeObject.getDate()}/${
    timeObject.getMonth() + 1
  }/${timeObject.getFullYear()}`;
  let time = `${timeObject.getHours()}:${timeObject.getMinutes()}`;
  return {
    today: `${day}, ${time} ${date}`,
  };
};

const generateDate = () => {
  let gapExpired = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let day = today.getDate() === 0 ? "Chủ nhật" : `Thứ ${today.getDay() + 1}`;
  let date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  let time = `${today.getHours()}:${today.getMinutes()}`;
  let expiredDay = moment(today).add(gapExpired, "d").toDate();
  return {
    today: formatDate(today),
    expiredDay: formatDate(expiredDay),
  };
};
export default generateDate;
