const { kakao } = window; // kakao object

class MarkerMapper extends kakao.maps.Marker{
    constructor(options, address) {
        this.address = address;
    }

    getLntLng() {
        let reqUrl = "/api/kostat/";
    }

}