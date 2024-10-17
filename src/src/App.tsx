import React from "react";
import logo from "./logo.svg";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Data } from "./lib/types";

import PetalChart from "./components/PetalChart";

import "./App.css";
const sampleData = [
  { value: 0, color: "#5087f7" },
  { value: 2, color: "#5ba1e6" },
  { value: 3, color: "#7ab4d1" },
  { value: 4, color: "#a1d3e8" },
  { value: 1, color: "#ffcc66" },
  { value: 4, color: "#ffb84d" },
  { value: 1, color: "#ff8e3d" },
  { value: 4, color: "#ff6e61" },
];
function App() {
  const [data, setData] = React.useState<Data[]>(sampleData);
  const [anshin, setAnshin] = React.useState<string>("2");
  const [seiketsu, setSeiketsu] = React.useState<string>("1");
  const [yutori, setYutori] = React.useState<string>("2");
  const [seizen, setSeizen] = React.useState<string>("1");

  const anshinId = React.useId();

  const position = new LatLng(35.675123, 139.763237);
  const zoom = 30;

  const handleClickDraw = () => {
    var templateData = [
      { value: 0, color: "#5087f7" },
      { value: 0, color: "#5ba1e6" },
      { value: 0, color: "#7ab4d1" },
      { value: 0, color: "#a1d3e8" },
      { value: 0, color: "#ffcc66" },
      { value: 0, color: "#ffb84d" },
      { value: 0, color: "#ff8e3d" },
      { value: 0, color: "#ff6e61" },
    ];
    if (Number(anshin) !== undefined && Number(anshin) > 0) {
      templateData[7].value = Number(anshin);
    }
    if (Number(anshin) !== undefined && Number(anshin) < 0) {
      templateData[3].value = Math.abs(Number(anshin));
    }
    if (Number(seiketsu) !== undefined && Number(seiketsu) > 0) {
      templateData[6].value = Number(seiketsu);
    }
    if (Number(seiketsu) !== undefined && Number(seiketsu) < 0) {
      templateData[2].value = Math.abs(Number(seiketsu));
    }
    if (Number(yutori) !== undefined && Number(yutori) > 0) {
      templateData[5].value = Number(yutori);
    }
    if (Number(yutori) !== undefined && Number(yutori) < 0) {
      templateData[1].value = Math.abs(Number(yutori));
    }
    if (Number(seizen) !== undefined && Number(seizen) > 0) {
      templateData[4].value = Number(seizen);
    }
    if (Number(seizen) !== undefined && Number(seizen) < 0) {
      templateData[0].value = Math.abs(Number(seizen));
    }

    setData(templateData);
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div className="flexbox">
        <form action="" method="post">
          <div className="formarea">
            <label>安心</label>
            <input
              type="number"
              value={anshin}
              min={-2}
              max={2}
              onChange={(e) => setAnshin(e.target.value)}
            ></input>
          </div>
          <div className="formarea">
            <label>清潔</label>
            <input
              type="number"
              value={seiketsu}
              min={-2}
              max={2}
              onChange={(e) => setSeiketsu(e.target.value)}
            ></input>
          </div>
          <div className="formarea">
            <label>ゆとりがある</label>
            <input
              type="number"
              value={yutori}
              min={-2}
              max={2}
              onChange={(e) => setYutori(e.target.value)}
            ></input>
          </div>
          <div className="formarea">
            <label>整然として</label>
            <input
              type="number"
              value={seizen}
              min={-2}
              max={2}
              onChange={(e) => setSeizen(e.target.value)}
            ></input>
          </div>
        </form>

        <div className="buttonwrap" style={{}}>
          <input
            type="button"
            value="描画"
            style={{
              margin: "4px",
              background: "#66CCFF	",
              border: "1px solid #555",
              color:"#000",
              borderRadius: "10%",
              boxShadow: "0 4px 2px -2px gray"
            }}
            onClick={handleClickDraw}
          />
        </div>
        <PetalChart data={data} />
      </div>
      {/* <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png"
        />
      </MapContainer> */}
    </div>
  );
}

export default App;
