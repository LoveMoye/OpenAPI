const express = require("express");
const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();

const { kostatReqURL, defaultKostatQueryRequestParams } = require('../../common/common.js');

router.get("/api/kostat/auth", (req, res) => {
    let reqUrl = kostatReqURL + "/auth/authentication.json";
    const consumer_key = process.env.consumer_key ? process.env.consumer_key : 'e1f37fc7a69f4918b212';
    const consumer_secret = process.env.consumer_key ? process.env.consumer_key : 'b81a8ee62aea464caebf';
    const reqParams = lodash.cloneDeep(defaultKostatQueryRequestParams);
    reqParams.consumer_key = consumer_key;
    reqParams.consumer_secret = consumer_secret;
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