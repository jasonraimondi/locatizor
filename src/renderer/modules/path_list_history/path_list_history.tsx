import React from "react";
import { ParsedPath } from "path";
import styled, { css } from "styled-components";

import { useCurrentPath } from "@/renderer/providers/use_current_path";
import { Path } from "@/renderer/providers/path";

export const PathListHistory = () => {
  const { pathHistory, path, setPath } = useCurrentPath();
  return <PathHistoryList>
    {
      pathHistory.map((p: ParsedPath, idx) => {
        const loopPath = Path.fromObject(p);
        let selected = false;
        if (path.toString() === loopPath.toString()) {
          selected = true;
        }
        return <PathLink
          key={idx}
          onClick={() => setPath(loopPath)}
          isSelected={selected}
        >
          {loopPath.toString()}
        </PathLink>;
      })
    }
  </PathHistoryList>;
};

const PathHistoryList = styled.ul`
  width: 100%;
  height: 100%;
  background-color: orange;
`;

const PathLink = styled.li<{ isSelected: boolean }>`
   ${props => props.isSelected && css`
    text-decoration: underline;
  `}
`;
