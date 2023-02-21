import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FeatureCard } from '../components/FeatureCard'

const FeatureViewContainer = styled.div`
  width: 95%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;    
`;

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
            <FeatureCard feature={feature} />
          );
        })}
    </FeatureViewContainer>
  );
};



export default FeatureView;