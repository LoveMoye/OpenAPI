const airqualityReqURL = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc`;
const defaultQueryRequestParams = {
    serviceKey: process.env.SERVICEKEY,
    returnType: "json",
    numOfRows: 1,
    pageNo: 1,
};

const measureStnInfoReqURL = `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc`;
const defaultMsrStnQueryRequestParams = {
    serviceKey: process.env.SERVICEKEY,
    returnType: "json",
    numOfRows: 1,
    pageNo: 1,
};
const kostatReqURL = `https://sgisapi.kostat.go.kr/OpenAPI3`;
const defaultKostatQueryRequestParams = {
};

module.exports = { airqualityReqURL, defaultQueryRequestParams, measureStnInfoReqURL, defaultMsrStnQueryRequestParams, kostatReqURL, defaultKostatQueryRequestParams }