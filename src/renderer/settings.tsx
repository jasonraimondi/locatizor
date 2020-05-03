import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ElectronSettingService } from "../main/settings_service";
import { Button } from "./elements/elements";

export const Settings = () => {
  const [isOptOut, setOptOut] = useState(ElectronSettingService.has("analytics-opt-out"));

  const toggleOpt = () => {
    console.log(isOptOut);
    if (isOptOut) {
      ElectronSettingService.delete("analytics-opt-out");
      setOptOut(false);
    } else {
      ElectronSettingService.set("analytics-opt-out", true);
      setOptOut(true);
    }
  };

  return <SettingWrapper>
    <Title>Settings</Title>
    <Body>
      <div style={{ display: "flex" }}>
        <CheckBox id="analytics-opt" type="checkbox" value={isOptOut.toString()} onClick={toggleOpt}/>
        <CheckBoxLabel htmlFor="analytics-opt">
          Opt out of analytics?<br/>
          <small>
            We only track "app was opened" by a unique user and nothing else.
            <br/>
            No identifiable information is saved.
            See <A className="open-link-externally" href="https://usefathom.com/">https://usefathom.com/</A>
          </small>
        </CheckBoxLabel>
      </div>
    </Body>
    <Footer>
      <Link to="/">
        <Button>Back</Button>
      </Link>
    </Footer>
  </SettingWrapper>;
};

export const A = styled.a`
  color: ${props => props.theme.main};
`;

const SettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const CheckBox = styled.input`
  margin: 0.25rem 1rem 0 0;
`;
const CheckBoxLabel = styled.label``;

const Body = styled.div`
  margin: 2rem 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
`;

const Footer = styled.div`
`;
