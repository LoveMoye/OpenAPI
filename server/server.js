const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Import routers
const forcastingAirQualityRouter = require("./src/router/AirQualityInfo/forcastingAirQuality.js");
const forcastingWeeklyPM25 = require("./src/router/AirQualityInfo/forcastingWeeklyPM25.js");
const measureInformation = require("./src/router/AirQualityInfo/measureInformation.js");
const measureBadInformation = require("./src/router/AirQualityInfo/measureBadInformation.js");
const measureSIDOInformation = require("./src/router/AirQualityInfo/measureSIDOInformation.js");

const measureStationList = require("./src/router/MeasureStationInfo/measureStationList.js");

const kostatAuthentication = require("./src/router/GeometricInfo/authentication.js");
const geometricInformation = require("./src/router/GeometricInfo/geometricInfo.js");

const measureAndStnInformation = require("./src/router/API/measureAndStnInformation");

app.use(express.static('public'))

app.get("/api", (req, res) => {
    res.sendFile(__dirname + "/public/html/test.html");
});

// 최근 데이터만 사용 가능. (며칠전 데이터까지 사용할 수 있는지 확인해야함.)
app.use("/api/getMinuDustFrcstDspth", forcastingAirQualityRouter);
// 전날 데이터 사용.
app.get("/api/getMinuDustWeekFrcstDspth/:searchDate", forcastingWeeklyPM25);
// 측정소별 측정 데이터.
app.use("/api/getMsrstnAcctoRltmMesureDnsty", measureInformation);
// 통합대기환경지수가 나쁨등급 이상인 측정소명과 주소 목록 정보 제공.
app.get("/api/getUnityAirEnvrnIdexSnstiveAboveMsrstnList", measureBadInformation);
// 시도별 실시간 측정정보.
app.get("/api/getCtprvnRltmMesureDnsty/:sidoName", measureSIDOInformation);

// 측정소 지리 정보 조회
app.use("/api/getMsrstnList", measureStationList);


// authentication api
app.get("/api/kostat/auth", kostatAuthentication);
// 지리 정보 얻음.
app.get("/api/kostat/:address", geometricInformation);


app.use("/api/measure-station-info", measureAndStnInformation);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});