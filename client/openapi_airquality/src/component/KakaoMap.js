import React, { useEffect, useMemo, useState, useRef } from 'react';
import proj4 from 'proj4';
import queryParse from '../utils/queryParse';
import measureStationInfo from "./measureStations";

const { kakao } = window; // kakao object

function transformCoordinate(x, y) {
    proj4.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";//제공되는 좌표 

    var grs80 = proj4.Proj(proj4.defs["EPSG:5179"])
    var wgs84 = proj4.Proj(proj4.defs["EPSG:4326"]); //경위도 
    var p = proj4.toPoint([x, y]);//한국지역정보개발원 좌표 
    p = proj4.transform(grs80, wgs84, p);
    return p;
}

export default function KakaoMap() {
    const [coordinateInit, setCoordinateInit] = useState({});
    const [mapOption, setMapOption] = useState({});
    const [markers, setMarkers] = useState([]);
    const [isMapRendered, setIsMapRendered] = useState(false);
    const map = useMemo(() => {
        if (mapOption.center && mapOption.center.La && mapOption.center.Ma && !isMapRendered) {
            const container = document.getElementById("map");
            setIsMapRendered(true);
            return new kakao.maps.Map(container, mapOption);
        }
    }, [mapOption]);

    useEffect(() => {
        async function fetchData() {
            let coordinateInit = await fetch("/api/kostat/대전", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": 'application/json',
                },
            })
                .then(response => response.json())
                .then(response => response.result.resultdata[0])
                .then(infoData => transformCoordinate(parseFloat(infoData.x), parseFloat(infoData.y)));
            setCoordinateInit(coordinateInit);
        }
        fetchData();
    }, [])

    useEffect(() => {
        let options = {
            // 대전을 중심으로.
            center: new kakao.maps.LatLng(coordinateInit.y, coordinateInit.x),
            level: 13,
        }
        setMapOption(options);
    }, [coordinateInit]);

    //marker 생성 
    useEffect(() => {
        async function fetchData(stn) {
            let msrStnInfo = await fetch(queryParse("/api/measure-station-info" + `/${stn}` + "/DAILY"), {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": 'application/json',
                },
            })
                .then(response => response.json())
                .catch(err => err);
            return msrStnInfo;
        }

        async function renderMarker(sido) {
            let i = 0
            for (const stn of measureStationInfo[sido]) {
                if (stn && i <= 0) {
                    const marker = await fetchData(stn)
                        .then(msrStnInfo => {
                            console.log(msrStnInfo);
                            const coordinate = msrStnInfo.stationInfo[0];
                            const iwContent = `<div style="padding:10px;width:250px;height:200px;">${coordinate.stationName}</div>` +
                                              `<div>${msrStnInfo.measureInfoItems[4].dataTime} PM10등급 ${msrStnInfo.measureInfoItems[4].pm10Grade} PM10농도 ${msrStnInfo.measureInfoItems[4].pm10Value}</div>` + 
                                              `<div>${msrStnInfo.measureInfoItems[3].dataTime} PM10등급 ${ msrStnInfo.measureInfoItems[3].pm10Grade} PM10농도 ${msrStnInfo.measureInfoItems[3].pm10Value}</div>` + 
                                              `<div>${msrStnInfo.measureInfoItems[2].dataTime} PM10등급 ${msrStnInfo.measureInfoItems[2].pm10Grade} PM10농도 ${msrStnInfo.measureInfoItems[2].pm10Value}</div>` +
                                              `<div>${msrStnInfo.measureInfoItems[1].dataTime} PM10등급 ${msrStnInfo.measureInfoItems[1].pm10Grade} PM10농도 ${msrStnInfo.measureInfoItems[1].pm10Value}</div>` +
                                              `<div>${msrStnInfo.measureInfoItems[0].dataTime} PM10등급 ${msrStnInfo.measureInfoItems[0].pm10Grade} PM10농도 ${msrStnInfo.measureInfoItems[0].pm10Value}</div>`;
                            const infowindow = new kakao.maps.InfoWindow({
                                content: iwContent
                            });
                            const marker = new kakao.maps.Marker({
                                position: new kakao.maps.LatLng(parseFloat(coordinate.dmX), parseFloat(coordinate.dmY)),
                                map: map,
                                clickable: true,
                            })
                            kakao.maps.event.addListener(marker, 'mouseover', function () {
                                // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                                infowindow.open(map, marker);
                            });
                            kakao.maps.event.addListener(marker, 'mouseout', function () {
                                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                                infowindow.close();
                            });
                            markers.push(marker);
                            setMarkers(markers);
                            return marker;
                        })
                        .catch(err => console.error(err));
                }
                i++;
            }
        }

        renderMarker("서울");
        renderMarker("경기");
        renderMarker("인천");
        renderMarker("강원");
        renderMarker("충남");
        renderMarker("대전");
        renderMarker("충북");
        renderMarker("대구");
        renderMarker("세종");
        renderMarker("부산");
        renderMarker("울산");
        renderMarker("경북");
        renderMarker("경남");
        renderMarker("전남");
        renderMarker("광주");
        renderMarker("전북");
        renderMarker("제주");
        


        // measureStations["서울"].forEach((stn, i) => {
        //     if (i <= 1) {
        //         const marker = fetchData(stn)
        //             .then(msrStnInfo => {
        //                 const coordinate = msrStnInfo.stationInfo[0];
        //                 const iwContent = `<div style="padding:10px;width:200px;height:200px;">${coordinate.stationName}</div>`;
        //                 const infowindow = new kakao.maps.InfoWindow({
        //                     content: iwContent
        //                 });
        //                 const marker = new kakao.maps.Marker({
        //                     position: new kakao.maps.LatLng(parseFloat(coordinate.dmX), parseFloat(coordinate.dmY)),
        //                     map: map,
        //                     clickable: true,
        //                 })
        //                 kakao.maps.event.addListener(marker, 'mouseover', function () {
        //                     // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        //                     infowindow.open(map, marker);
        //                 });
        //                 kakao.maps.event.addListener(marker, 'mouseout', function () {
        //                     // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        //                     infowindow.close();
        //                 });
        //                 markers.push(marker);
        //                 setMarkers(markers);
        //                 return marker;
        //             });
        //     }
    
}, [map, markers]);

// useEffect(() =>{
//     markers.forEach(m => {
//         m.setMap(map);
//     });
// }, [map, markers]);


return (
    <div id="map" style={{
        width: '500px',
        height: '500px'
    }}>
    </div>
)
};