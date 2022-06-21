import "./footer.css";

function Footer(props) {
  return (
    <>
      <footer class="footer">
        <div className="footerDiwise">
          <ul>
            <li>
              <a href="/">FAQ</a>
            </li>
            <li>
              <a href="/">Diwise</a>
            </li>
            <li>
              <a href="/">GitHub</a>
            </li>
            <li>
              <a href="/">Rapportera en bugg</a>
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
        </div>
      </footer>
    </>
  );
}
export default Footer;
