const express = require("express");
const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();

const { measureStnInfoReqURL, defaultMsrStnQueryRequestParams } = require('../../common/common.js');

router.get("/:stationName", (req, res) => {
    let reqUrl = measureStnInfoReqURL + "/getMsrstnList";
    const stationName = req.params.stationName;
    const reqParams = lodash.cloneDeep(defaultMsrStnQueryRequestParams);
    reqParams.stationName = stationName;
    // reqParams.serviceKey = "wMXxrFvn74WsdYwySgfY%2BiEXsFUj4TByV0aSMh%2BtXYwBBwLnR0Z4YxgbW%2FMKI5gFwO3Q6tDfHyHAaqf6lACshg%3D%3D";
    reqUrl = queryParse(reqUrl, reqParams);

    const response = fetch(reqUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.text())
    .then(response => res.send(response))
    .catch(err => res.send(err));
});

router.get("/:addr/:stationName", (req, res) => {
    let reqUrl = measureStnInfoReqURL + "/getMsrstnList";
    const addr = req.params.addr;
    const stationName = req.params.stationName;
    const reqParams = lodash.cloneDeep(defaultMsrStnQueryRequestParams);
    reqParams.addr = addr;
    reqParams.stationName = stationName;
    reqUrl = queryParse(reqUrl, reqParams);

    const response = fetch(reqUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.text())
    .then(response => res.send(response))
    .catch(err => res.send(err));
});

module.exports = router;