import MainPage from "../components/MainPage";
import { useEffect, useState } from "react";

const Loader = () => {
  const [stops, setStops] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [stopId, setStopId] = useState("");
  const [period, setPeriod] = useState("3");
  const [transport, setTransport] = useState("all");
  const [isLoading, setIsloading] = useState(true);
  const [filteredArrivals, setFilteredArrivals] = useState(null);

  useEffect(() => {
    const fetchStops = async () => {
      let response = await fetch("http://localhost:3000/stops.json");
      let data = await response.json();
      setIsloading(false);
      setStops(data);
    };

    fetchStops();
  }, []);

  useEffect(() => {
    const fetchArrivals = async () => {
      setIsloading(true);
      let response = await fetch(`https://v5.bvg.transport.rest/stops/${stopId}/arrivals?duration=${period}`);
      let data = await response.json();
      setIsloading(false);
      setArrivals(data);
    };
    if (stopId) fetchArrivals();
  }, [stopId, period]);

  useEffect(() => {
    console.log(transport);
    const filterArrivals = () => {
      if (transport === "all") {
        setFilteredArrivals(null);
      } else {
        setFilteredArrivals(arrivals.filter((arrival) => arrival.line.product === transport));
      }
    };

    filterArrivals();
  }, [transport, arrivals, period]);

  const changeStop = (selectedStop) => {
    setStopId(selectedStop);
  };

  const changePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const changeTransport = (event) => {
    setTransport(event.target.value);
  };

  return <MainPage stops={stops} changeStop={changeStop} changePeriod={changePeriod} changeTransport={changeTransport} arrivals={filteredArrivals || arrivals} isLoading={isLoading} />;
};

export default Loader;

// let arrayFailed = [];

// async function asyncAwaitWay() {
//   let results;
//   // noprotect
//   for (const stop of stops) {
//     results = await fetch(`https://v5.bvg.transport.rest/stops/${stop.id}/arrivals?duration=30`);
//     // console.log(results);
//     // let data = await results.json();

//     if (results.status !== 200) {
//       console.log("error (not 200) on stop id:", stop.id);
//       arrayFailed.push(stop.id);
//     }
//   }
//   console.log(arrayFailed);
// }

// asyncAwaitWay();
