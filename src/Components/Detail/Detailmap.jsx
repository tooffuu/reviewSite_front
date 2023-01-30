import React from "react";
import { useEffect } from "react";

const Detailmap = ({ mappgRef, reviewRef }) => {
  const { kakao } = window;
  //-----------------------------------------------

  //지도 로직
  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: new kakao.maps.LatLng(36.349348279760655, 127.3766854960456), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);
  }, []);

  return (
    <div className="map_wrap">
      <div className="maptext" ref={mappgRef}>
        위치정보
      </div>
      <div className="rode_api1" id="map" ref={reviewRef}></div>
    </div>
  );
};

export default Detailmap;
