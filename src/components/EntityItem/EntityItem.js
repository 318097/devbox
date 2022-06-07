import React from "react";
import tracker from "../../lib/mixpanel";
import { MenuWrapper, TagWrapper, TooltipWrapper } from "../../lib/UI";
import { copyToClipboard } from "@codedrops/lib";
import notify from "../../lib/notify";
import { menuOptions, parseValue } from "../../lib/helpers";

const EntityItem = ({ entity, handleAction }) => {
  const { label, keyName, path, _id, color } = entity;

  const value = parseValue({ keyName, path });
  const parsedLabel = value === "UNDEFINED_KEY" ? value : label;
  const parsedValue = value === "UNDEFINED_KEY" ? "-" : value;

  const copy = () => {
    copyToClipboard(parsedValue);
    notify("Copied.");
  };

  const tooltipContent = (
    <div className="tooltip-wrapper">
      <div className="tooltip-item">
        <strong>Label:</strong>
        <span>{parsedLabel}</span>
      </div>
      <div className="tooltip-item">
        <strong>Local storage key:</strong>
        <span>{keyName}</span>
      </div>

      {/* {!!path && (
        <div className="tooltip-item">
          <strong>Path:</strong>
          <span>{path}</span>
        </div>
      )} */}

      <div className="tooltip-item">
        <strong>Value breakdown:</strong>
        <span>
          {path
            ? `_.get(JSON.parse(localStorage.getItem('${keyName}')), '${path}')`
            : `localStorage.getItem('${keyName}')`}
        </span>
      </div>
    </div>
  );

  const parsedPath = path ? `'${keyName}.${path}'` : `'${keyName}`;

  return (
    <div className="entity-item">
      <TooltipWrapper title={tooltipContent}>
        <div className="entity-section-wrapper">
          <div className="entity-label">{parsedLabel}</div>
          <div className="entity-path">{parsedPath}</div>
        </div>
      </TooltipWrapper>

      <TagWrapper className="entity-value" onClick={copy} color={color}>
        {parsedValue}
      </TagWrapper>

      <MenuWrapper
        onChange={(action) => handleAction(action, _id)}
        options={menuOptions}
      />
    </div>
  );
};

export default EntityItem;
