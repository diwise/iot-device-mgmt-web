import "./searchcard.css";
import Form from "react-bootstrap/Form";
import Button from "../Button";

function SearchCard() {
  return (
    <>
      <div className="blockWrapper">
        <div className="blockContainer">
          <div className="blockTitle">
            <h2>Sök enhet</h2>
          </div>
          <div className="blockContent">
            <div className="searchForm">
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Namn</Form.Label>
                  <Form.Control type="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="id">
                  <Form.Label>ID</Form.Label>
                  <Form.Control type="id" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="environment">
                  <Form.Label>Miljö</Form.Label>
                  <Form.Select>
                    <option>Vatten</option>
                    <option>Livbojar</option>
                    <option>Trädgård</option>
                    <option>Vägar</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="show">
                  <Form.Label>Visa enheter med status:</Form.Label>
                  <Form.Select>
                    <option>Alla</option>
                    <option>med fel</option>
                    <option>med varningar</option>
                    <option>med varningar eller fel</option>
                  </Form.Select>
                </Form.Group>

                <div>
                  <Button buttonText="Sök" />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchCard;
