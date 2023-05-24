import LoaderGrid from "./LoaderGrid";
import { useRef } from "react";

function Arrivals(props) {
  const { changePeriod, changeTransport, toggleStopInFav, arrivals, selectedStopName, isStopInfavoriteStops, isLoading } = props;

  const snackbarRef = useRef();

  return (
    <>
      {selectedStopName && (
        <div className="arrivals">
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
              <option value="10">10 minutes</option>
              <option value="20">20 minutes</option>
              <option value="30">30 minutes</option>
            </select>
          </div>

          <div className="stop-info">
            <div className="selected-stop-name">
              {selectedStopName}{" "}
              <span
                onClick={() => {
                  toggleStopInFav();
                  snackbarRef.current.className = "show";
                  setTimeout(() => {
                    snackbarRef.current.className = "";
                  }, 3000);
                }}
                className={"tooltip material-symbols-outlined" + (isStopInfavoriteStops() ? " filled" : "")}
              >
                star
              </span>
            </div>

            <div className="arrivals-table">
              {arrivals.length
                ? arrivals.map((arrival, index) => (
                    <div className="arrival-info" key={index}>
                      <div className="time">{new Date(arrival.when).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                      <div className="type">{arrival.line.product.toUpperCase()}</div>
                      <div className="transport-number">{arrival.line.name}</div>
                      <div className="destination"> {`"${arrival.provenance}"`}</div>
                    </div>
                  ))
                : "There is not arrivals for selected transport and time :("}
            </div>
          </div>
        </div>
      )}

      {isLoading && <LoaderGrid />}
      <div ref={snackbarRef} id="snackbar">
        {isStopInfavoriteStops() ? "Stop added to Favorites" : "Stop removed from Favorites"}
      </div>
    </>
  );
}

export default Arrivals;
