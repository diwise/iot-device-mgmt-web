import { FeatureCard } from '../components/FeatureCard'

const FeatureViewContainer = ({ children }) => {
  return (
    <div className="featureview-page">{children}</div>
  );
}

const FeatureView = ({ features }) => {
  let funcs = features.sort((a, b) => {
    let funcTypeA = a.type + ":" + a.subtype;
    let funcTypeB = b.type + ":" + b.subtype;
    if (funcTypeA < funcTypeB) {
      return -1;
    } else if (funcTypeA > funcTypeB) {
      return 1;
    }
    return 0;
  });

  return (
    <FeatureViewContainer>
      {funcs.map((f) => {
        return (
          <div key={f.id} className="card item featureCard">
            <div className="card-container">
              <FeatureCard feature={f} />
            </div>
          </div>
        );
      })}
    </FeatureViewContainer>
  );
};

export default FeatureView;