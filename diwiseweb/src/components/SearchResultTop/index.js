import "./searchresulttop.css";

const SearchResultTop = (props) => {
  return (
    <>
      <div className="grid searchResultTop">
        <div>
          <strong>{props.columnOne}</strong>
        </div>
        <div>
          <strong>{props.columnTwo}</strong>
        </div>
        <div>
          <strong>{props.columnThree}</strong>
        </div>
      </div>
    </>
  );
};

export default SearchResultTop;
