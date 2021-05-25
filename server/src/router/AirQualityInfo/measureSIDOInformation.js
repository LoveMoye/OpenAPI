const express = require("express");
const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();

const { airqualityReqURL, defaultQueryRequestParams } = require('../../common/common.js');

// - 버전을 포함하지 않고 호출할 경우 : PM2.5 데이터가 포함되지 않은 원래 오퍼레이션 결과 표출.
// - 버전 1.0을 호출할 경우 : PM2.5 데이터가 포함된 결과 표출.
// - 버전 1.1을 호출할 경우 : PM10, PM2.5 24시간 예측이동 평균데이터가 포함된 결과 표출.
// - 버전 1.2을 호출할 경우 : 측정망 정보 데이터가 포함된 결과 표출.
// - 버전 1.3을 호출할 경우 : PM10, PM2.5 1시간 등급 자료가 포함된 결과 표출
router.get("/api/getCtprvnRltmMesureDnsty/:sidoName", (req, res) => {
    let reqUrl = airqualityReqURL + "/getCtprvnRltmMesureDnsty";
    const sidoName = req.params.sidoName;
    const reqParams = lodash.cloneDeep(defaultQueryRequestParams);
    reqParams.sidoName = sidoName;
    reqUrl = queryParse(reqUrl, reqParams);

    fetch(reqUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    // error는 xml로 반환됨. json error처리 해줘야함.
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(err => res.send(err));
});

module.exports = router;