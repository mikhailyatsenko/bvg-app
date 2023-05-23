import MainPage from "../components/MainPage";
import Arrivals from "../components/Arrivals";
import { useEffect, useState } from "react";

const Loader = () => {
  const [inputValue, setInputValue] = useState("");
  const [stops, setStops] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const [selectedStop, setSelectedStop] = useState({ id: "", name: "" });
  // const [stopId, setStopId] = useState("");
  const [period, setPeriod] = useState("3");
  const [transport, setTransport] = useState("all");
  const [isLoading, setIsloading] = useState(true);
  const [filteredArrivals, setFilteredArrivals] = useState(null);
  const [favoriteStops, setFavoriteStops] = useState(JSON.parse(localStorage.getItem("favStops")) || []);

  const filteredStops = stops.filter((stop) => {
    return stop.name.toLowerCase().includes(inputValue.toLowerCase());
  });
  const filterStopsToRender = filteredStops.slice(0, 100); // limit to render max 100 stops on page

  useEffect(() => {
    const loadStops = async () => {
      let response = await fetch(`${document.location.origin}/stops.json`);
      let data = await response.json();
      setIsloading(false);
      setStops(data);
    };

    loadStops();
  }, []);

  useEffect(() => {
    const fetchArrivals = async () => {
      setIsloading(true);
      let response = await fetch(`https://v5.bvg.transport.rest/stops/${selectedStop.id}/arrivals?duration=${period}`);
      let data = await response.json();
      setIsloading(false);
      setArrivals(data);
    };
    if (selectedStop.id) fetchArrivals();
  }, [selectedStop.id, period]);

  useEffect(() => {
    const filterArrivals = () => {
      if (transport === "all") {
        setFilteredArrivals(null);
      } else {
        setFilteredArrivals(arrivals.filter((arrival) => arrival.line.product === transport));
      }
    };

    filterArrivals();
  }, [transport, arrivals, period]);

  const updateInput = (value) => {
    setInputValue(value);
    if (selectedStop.name) setSelectedStop({ id: "", name: "" });
  };

  const selectStop = (selectedStopId, selectedStopName) => {
    setSelectedStop({ id: selectedStopId, name: selectedStopName });
  };

  const changePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const changeTransport = (event) => {
    setTransport(event.target.value);
  };

  const isStopInfavoriteStops = () => {
    for (let i = 0; i < favoriteStops.length; i++) {
      if (favoriteStops[i].id === selectedStop.id) {
        return true;
      }
    }
    return false;
  };

  const toggleStopInFav = () => {
    const tempFavoriteStops = JSON.parse(JSON.stringify(favoriteStops));

    if (isStopInfavoriteStops()) {
      removeFavStop(selectedStop.id);
      return null;
    }

    console.log("только если станция не в избранном");
    tempFavoriteStops.push(selectedStop);
    console.log(tempFavoriteStops);

    setFavoriteStops(tempFavoriteStops);

    localStorage.setItem("favStops", JSON.stringify(tempFavoriteStops));
  };

  const removeFavStop = (idStopToRemove) => {
    const tempFavoriteStops = JSON.parse(JSON.stringify(favoriteStops));
    for (let i = 0; i < favoriteStops.length; i++) {
      if (favoriteStops[i].id === idStopToRemove) {
        tempFavoriteStops.splice(i, 1);
      }
    }

    setFavoriteStops(tempFavoriteStops);
    localStorage.setItem("favStops", JSON.stringify(tempFavoriteStops));
  };

  const removeAllFavoriteStops = () => {
    setFavoriteStops([]);
    localStorage.setItem("favStops", "[]");
  };

  return (
    <main>
      <MainPage
        updateInput={updateInput}
        inputValue={inputValue}
        filterStopsToRender={filterStopsToRender}
        favoriteStops={favoriteStops}
        removeFavStop={removeFavStop}
        selectStop={selectStop}
        isLoading={isLoading}
        selectedStopName={selectedStop.name}
        removeAllFavoriteStops={removeAllFavoriteStops}
      />
      <Arrivals changePeriod={changePeriod} changeTransport={changeTransport} toggleStopInFav={toggleStopInFav} arrivals={filteredArrivals || arrivals} selectedStopName={selectedStop.name} isStopInfavoriteStops={isStopInfavoriteStops} />
    </main>
  );
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
