import EditIcon from "./editIcon";
import HistoryIcon from "./historyIcon";
import MapIcon from "./mapIcon";
import ReportIcon from "./reportIcon";
import "./subnav.css";

function SubNavigation(props) {
  return (
    <div className="subNavigationContainer">
      <div className="navLinks">
        <a class="navTitle" href="/device">
          <h2>{props.deviceName}</h2>
        </a>
        <ul>
          <li>
            <a href="#">
              <span className="subnavDesktop">Visa på karta</span>
              <span className="subnavMobile">
                <MapIcon />
              </span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/rapporter">
              <span className="subnavDesktop">Rapporter</span>
              <span className="subnavMobile">
                <ReportIcon />
              </span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/historik">
              <span className="subnavDesktop">Historik</span>
              <span className="subnavMobile">
                <HistoryIcon />
              </span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/uppdatera">
              <span className="subnavDesktop">Uppdatera</span>
              <span className="subnavMobile">
                <EditIcon />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SubNavigation;
