const express = require("express");
const axios = require("axios");
const app = express();
var cors = require("cors");
app.use(cors());
function bookCultClass(epochTime, slotId) {
  console.log("epochTime-->", epochTime, slotId);
  let data = JSON.stringify({
    classId: slotId,
    productType: "PLAY",
    workoutId: 350,
    centerId: 1152,
    bookingTimestamp: epochTime,
    slotId: slotId,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.cult.fit/api/v2/fitso/web/class/book",
    headers: {
      accept: "application/json",
      "accept-language": "en-GB,en-IN;q=0.9,en-US;q=0.8,en;q=0.7",
      apikey: "9d153009-e961-4718-a343-2a36b0a1d1fd",
      appversion: "7",
      browsername: "Web",
      "content-type": "application/json",
      cookie:
        "deviceId=s%3A815a4f6d-64a0-4614-a335-ba121b25d77c.4nIen32UZWG6iSVnupip7%2F4L9u2pdNTfJmvu0gTlrGQ; _gcl_au=1.1.638132145.1712855788; _gid=GA1.2.100489792.1712855788; _fbp=fb.1.1712855788484.1679232622; _ga=GA1.2.1992182984.1712855788; at=s%3ACFAPP%3Aa9692521-9d5b-4df4-902c-b75c387ad239.7X1I%2Fmlz1fucnNRpQGG6llj8jwyjV%2FS%2FcISMTPIqO3o; st=s%3ACFAPP%3Adddb4f66-8942-48e1-9985-e8261f4ad26f.EeWiECHBHSjznknwg8SB337SusJRgBz21Q6TWae8vD0; G_ENABLED_IDPS=google; _gat_UA-92412423-1=1; _ga_V0XZM8114H=GS1.1.1712855788.1.1.1712856241.54.0.0",
      origin: "https://www.cult.fit",
      osname: "browser",
      referer:
        "https://www.cult.fit/play/slotbooking?workoutId=350&productType=PLAY&pageType=slotbooking&pageFrom=fitnesshub&centerId=1152",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      timezone: "Asia/Kolkata",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "x-request-id": "20c509b7-0daf-837b-1d67-f3a166565d9a",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("\n\n\n this is an error");
    });
}

const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = [4, 5];
rule.minute = 0;
rule.second = [2, 6, 10];

const job = schedule.scheduleJob(rule, function (props) {
  let dateObject = new Date();
  let date = ("0" + dateObject.getDate()).slice(-2);
  let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
  let year = dateObject.getFullYear();
  let epochTime =
    props.getHours() == 4
      ? new Date(`${month}/${date}/${year} 06:00`)
      : new Date(`${month}/${date}/${year} 07:00`);
  let minute = dateObject.getMinutes();
  let second = dateObject.getSeconds();
  let slotId = props.getHours() == 4 ? 2 : 3;
  bookCultClass(epochTime.getTime(), slotId);
});

app.get("/hc", (req, res) => {
  res.send("working file");
});
app.listen(3000, () => {
  console.log("server execution start");
});
