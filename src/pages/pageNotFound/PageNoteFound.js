import React from "react";
import ContextWrapper from "../../ContextWrapper";

const PageNoteFound = () => {
  return (
    <div className="mt-14 py-20 bg-navy-blue">
      <ContextWrapper>
        <div className="flex flex-col justify-center items-center text-white gap-4">
          <h1 className="text-5xl">404</h1>
          <h3 className="text-3xl">Page Not Found!</h3>
        </div>
      </ContextWrapper>
    </div>
  );
};

export default PageNoteFound;
