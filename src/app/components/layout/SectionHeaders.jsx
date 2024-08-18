import React from "react";

function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <div>
      <h3 className="uppercase font-semibold text-gray-500">{subHeader}</h3>
      <h2 className="text-red-500 font-bold text-4xl italic">{mainHeader}</h2>
    </div>
  );
}

export default SectionHeaders;
