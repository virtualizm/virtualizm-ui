import React from "react";

function renderList(data) {
  if (data) {
    return (
      <ul>
        {Object.keys(data).map(field => {
          const label = data[field];
          const isObject = typeof label === "object";

          if (isObject) {
            return (
              <li>
                {field} {renderList(label)}
              </li>
            );
          }

          return <li key={field}>{`${field}: ${label}`}</li>;
        })}
      </ul>
    );
  }
}

export const Details = ({ data }) => {
  return renderList(data);
};
