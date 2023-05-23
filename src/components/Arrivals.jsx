function Arrivals(props) {
  const { changePeriod, changeTransport, toggleStopInFav, arrivals, selectedStopName, isStopInfavoriteStops } = props;

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
              <option value="3">3 minutes</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="20">20 minutes</option>
              <option value="50">50 minutes</option>
            </select>
          </div>

          <div className="stop-info">
            <div className="selected-stop-name">
              {selectedStopName}{" "}
              <span
                onClick={() => {
                  toggleStopInFav();
                }}
                className={"tooltip material-symbols-outlined " + (isStopInfavoriteStops() && "filled")}
              >
                star
                <span class="tooltiptext">Tooltip text</span>
              </span>
            </div>

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
        </div>
      )}
    </>
  );
}

export default Arrivals;
