import { FeatureCard, FeatureCardWrapper } from '../components/FeatureCard'

const FeatureViewContainer = ({ children }) => {
  return (
    <div className="featureview-page">{children}</div>
  );
}


const FeatureView = ({ features }) => {
  return (
    <FeatureViewContainer>
      {features
        .sort((a, b) => {
          let aa = a.type + a.subtype;
          let bb = a.type + b.subtype;

          if (aa < bb) {
            return -1
          } else if (aa > bb) {
            return 1
          }

          return 0
        })
        .map((feature) => {
          return (
            <div className="card item featureCard">
              <div className="card-container">
                <FeatureCard feature={feature} />
              </div>
            </div>
          );
        })}
    </FeatureViewContainer>
  );
};



export default FeatureView;