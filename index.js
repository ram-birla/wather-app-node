// http://api.openweathermap.org/data/2.5/weather?q=sanawad&appid=45ceeafe16e6f1b015d7a5ea132c909c
const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp));
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=indore&appid=45ceeafe16e6f1b015d7a5ea132c909c"
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        console.log(arrData);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("closed");
        console.log("end");
        res.end()
      });
  }
});

server.listen(8001, "127.0.0.1");
