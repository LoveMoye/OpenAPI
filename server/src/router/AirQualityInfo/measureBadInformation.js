const express = require("express");
const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();

const { airqualityReqURL, defaultQueryRequestParams } = require('../../common/common.js');
const measureStationInfo = require("../../common/measureStationInfo/measureStations.js");

router.get("/api/getUnityAirEnvrnIdexSnstiveAboveMsrstnList", (req, res) => {
    let reqUrl = airqualityReqURL + "/getUnityAirEnvrnIdexSnstiveAboveMsrstnList";
    const reqParams = lodash.cloneDeep(defaultQueryRequestParams);
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