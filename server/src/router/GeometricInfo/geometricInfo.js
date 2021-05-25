const express = require("express");
const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();
const host = "http://localhost:3001"

const { kostatReqURL, defaultKostatQueryRequestParams } = require('../../common/common.js');

async function getAccessToken(req, res) {
    const accessToken = await fetch(host+"/api/kostat/auth", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => response.result.accessToken)
    .catch(err => res.send(err));
    console.log(await accessToken);
    return accessToken;
}

router.get("/api/kostat/:address", (req, res) => {
    let reqUrl = kostatReqURL + "/addr/geocode.json";
    const accessToken = getAccessToken(req, res);
    const address = req.params.address;
    const reqParams = lodash.cloneDeep(defaultKostatQueryRequestParams);
    reqParams.accessToken = accessToken;
    reqParams.address = address;
    reqUrl = queryParse(reqUrl, reqParams);

    fetch(reqUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(err => res.send(err));
});

module.exports = router;