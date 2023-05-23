import { useRef, useEffect } from "react";

function MainPage(props) {
  const inputRef = useRef(null);
  const { updateInput, inputValue, filterStopsToRender, selectedStopName, favoriteStops, selectStop, removeFavStop, isLoading, removeAllFavoriteStops } = props;
  // const sBahnArrivals = arrivals.filter((arrival) => arrival.line.product === "suburban");
  // const uBahnArrivals = arrivals.filter((arrival) => arrival.line.product === "subway");
  // const tramArrivals = arrivals.filter((arrival) => arrival.line.product === "tram");
  // const busArrivals = arrivals.filter((arrival) => arrival.line.product === "bus");
  // const regionalArrivals = arrivals.filter((arrival) => arrival.line.product === "regional");

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  return (
    <>
      <input
        className="input-stop-name"
        type="text"
        value={inputValue}
        placeholder="type stop name here..."
        ref={inputRef}
        onChange={(event) => {
          updateInput(event.target.value);
        }}
      />

      {isLoading && <div className="loader">Loading...</div>}

      {!selectedStopName && !isLoading && (
        <div className="stops-list">
          {(!inputValue && favoriteStops.length) || filterStopsToRender.length
            ? (!inputValue && favoriteStops.length ? favoriteStops : filterStopsToRender).map((stop) => (
                <div className="stop-in-list" key={stop.id}>
                  <div
                    className="stop-name"
                    onClick={() => {
                      updateInput(stop.name);
                      selectStop(stop.id, stop.name);
                    }}
                  >
                    {stop.name}
                  </div>
                  {!inputValue && Boolean(favoriteStops.length) && (
                    <div
                      onClick={() => {
                        removeFavStop(stop.id);
                      }}
                      className="delete-fav-icon"
                    >
                      <span className="material-symbols-outlined filled">cancel</span>
                    </div>
                  )}
                </div>
              ))
            : "no results for this query"}
          {!inputValue && Boolean(favoriteStops.length) && (
            <>
              <div className="fav-description">This is your favorites stops. Need another stop arrivals? Start type stop name</div>
              <div onClick={removeAllFavoriteStops}>Remove all favorites stops</div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default MainPage;
