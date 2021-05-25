const express = require("express");
// const lodash = require("lodash");
const fetch = require("node-fetch");

const queryParse = require("../../utils/queryParse.js");
const router = express.Router();

const host = "http://localhost:3001"
const defaultUrl = "/api"

async function handleResponse(getMsrStnAccUrl, getMsrStnInfoUrl,) {

    const msrStnAcc = await fetch(getMsrStnAccUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    .then(response => response.json())
    .then(response => console.log(response.response.body))
    .catch(err => err);

    const mstStnInfo = await fetch(getMsrStnInfoUrl, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json',
        }
    })
    .then(response => response.json())
    .then(response => console.log(response.response.body))
    .catch(err => err);

    const response = await {
        stationInfo: mstStnInfo.items,
        measureInfoItems: msrStnAcc.items
    }
    return response;
}

router.get("/:stationName/:dataTerm", (req, res) => {
    const stationName = req.params.stationName;
    const dataTerm = req.params.dataTerm;
    let getMsrStnAccUrl = host + defaultUrl + "/getMsrstnAcctoRltmMesureDnsty" + `/${encodeURI(stationName)}/${dataTerm}`;
    let getMsrStnInfoUrl = host + defaultUrl + "/getMsrstnList" + `/${encodeURI(stationName)}`;

    handleResponse(getMsrStnAccUrl, getMsrStnInfoUrl,)
    .then(response => res.send(response));
});

module.exports = router;