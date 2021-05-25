const express = require("express");
const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();

const { airqualityReqURL, defaultQueryRequestParams } = require('../../common/common.js');

// 최근 데이터만 사용 가능. (며칠전 데이터까지 사용할 수 있는지 확인해야함.)
router.get("/api/getMinuDustWeekFrcstDspth/:searchDate", (req, res) => {
    let reqUrl = airqualityReqURL + "/getMinuDustWeekFrcstDspth";
    const searchDate = req.params.searchDate;
    const reqParams = lodash.cloneDeep(defaultQueryRequestParams);
    reqParams.searchDate = searchDate;
    reqUrl = queryParse(reqUrl, reqParams);

    const response = fetch(reqUrl, {
        method:"GET",
        mode:"cors",
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then(response => response.json())
    .then(response => res.send(response));
});

module.exports = router;