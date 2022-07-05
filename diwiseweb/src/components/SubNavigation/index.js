import "./subnav.css";

function SubNavigation(props) {
  return (
    <div className="subNavigationContainer">
      <div className="navLinks">
        <h2>{props.deviceName}</h2>
        <ul>
          <li>
            <a href="#">Visa på karta</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Rapporter</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Historik</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Uppdatera</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SubNavigation;
