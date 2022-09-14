import "./footer.css";
import ThemeButton from "../ThemeButton";

function Footer(props) {
  return (
    <>
      <footer className="footer">
        <div className="footerDiwise">
          <ul>
            <li>
              <a href={props.faqUrl}>{props.faqText}</a>
            </li>
            <li>
              <a href={props.diwiseUrl}>{props.diwiseText}</a>
            </li>
            <li>
              <a href={props.githubUrl}>{props.githubText}</a>
            </li>
            <li>
              <a href={props.bugReportUrl}>{props.bugReportText}</a>
            </li>
          </ul>
        </div>
        <div className="footerCust">
          <a
            className="custLogo"
            href={props.customerWebsite}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={props.customerLogoUrl}
              alt={props.customerLogoDescription}
            />
          </a>
          <div className="custContact">
            <div className="support">För support, kontakta:</div>
            <div>
              <a href={"tel:" + props.customerPhoneNumber}>
                {props.customerPhoneNumber}
              </a>
            </div>
            <div>
              <a href={"email:" + props.customerEmail}>{props.customerEmail}</a>
            </div>
          </div>
          <div>
            <ThemeButton />
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
