import { FunctionCard } from '../components/FunctionCard'

const FunctionViewContainer = ({ children }) => {
  return (
    <div className="functionview-page">{children}</div>
  );
}

const FunctionView = ({ functions }) => {
  let funcs = functions.sort((a, b) => {
    let na = a.name ? "a__" + a.name : "z__" + a.id
    let nb = b.name ? "a__" + b.name : "z__" + b.id

    let ___a = a.type + ":" + a.subtype + ":" + na;
    let ___b = b.type + ":" + b.subtype + ":" + nb;

    if (___a < ___b) {
      return -1;
    } else if (___a > ___b) {
      return 1;
    }
    return 0;
  });

  return (
    <FunctionViewContainer>
      {funcs.map((f) => {
        return (
          <div key={f.id} className="card item functionCard">
            <div className="card-container">
              <FunctionCard func={f} />
            </div>
          </div>
        );
      })}
    </FunctionViewContainer>
  );
};

export default FunctionView;