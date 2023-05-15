import { useRef, useState, useEffect } from "react";

function MainPage(props) {
  const inputRef = useRef(null);
  const { stops, changePeriod, changeStop, arrivals, isLoading, changeTransport } = props;
  // const sBahnArrivals = arrivals.filter((arrival) => arrival.line.product === "suburban");
  // const uBahnArrivals = arrivals.filter((arrival) => arrival.line.product === "subway");
  // const tramArrivals = arrivals.filter((arrival) => arrival.line.product === "tram");
  // const busArrivals = arrivals.filter((arrival) => arrival.line.product === "bus");
  // const regionalArrivals = arrivals.filter((arrival) => arrival.line.product === "regional");

  const [inputValue, setInputValue] = useState("");
  const [selectedStop, setSlectedStop] = useState("");

  let filteredStops = stops.filter((stop) => {
    return stop.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  return (
    <main>
      <input
        className="input-stop-name"
        type="text"
        value={inputValue}
        // placeholder="type stop name here..."
        ref={inputRef}
        onChange={(event) => {
          setInputValue(event.target.value);
          setSlectedStop("");
        }}
      />
      {selectedStop && (
        <div className="arrival-options">
          <select onChange={changeTransport}>
            <option value="all">All types of transport</option>
            <option value="suburban">S-bahn</option>
            <option value="subway">U-bahn</option>
            <option value="bus">Bus</option>
            <option value="tram">Tram</option>
            <option value="regional">Regional</option>
          </select>
          <select onChange={changePeriod}>
            <option value="3">3 minutes</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
          </select>
        </div>
      )}
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : !selectedStop ? (
        <div className="stops-list">
          {filteredStops.length
            ? filteredStops.map((stop, index) => (
                <div
                  className="stop-name"
                  key={stop.id}
                  onClick={() => {
                    setInputValue(stop.name);
                    setSlectedStop(stop.name);
                    changeStop(stop.id);
                  }}
                >
                  {stop.name}
                </div>
              ))
            : "No results for this query"}
        </div>
      ) : (
        <div className="stop-info">
          <div className="selected-stop-name">{selectedStop}</div>
          <div className="arrivals-table">
            {arrivals.map((arrival, index) => (
              <div className="arrival-info" key={index}>
                <div className="time">{new Date(arrival.when).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                <div className="type">{arrival.line.product.toUpperCase()}</div>
                <div className="transport-number">{arrival.line.name}</div>
                <div className="destination"> {`"${arrival.provenance}"`}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* {selectedStop && (
        <div className="stop-info">
          <div className="selected-stop-name">{selectedStop}</div>
          <div className="arrivals-table">
            {arrivals.map((arrival, index) => (
              <div className="arrival-info" key={index}>
                <div className="time">{new Date(arrival.when).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                <div className="type">{arrival.line.product.toUpperCase()}</div>
                <div className="transport-number">{arrival.line.name}</div>
                <div className="destination"> {`"${arrival.provenance}"`}</div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </main>
  );
}

export default MainPage;
