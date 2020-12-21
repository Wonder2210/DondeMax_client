import React from "react";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Icon } from "@iconify/react";
import pdf from "@iconify/icons-cib/adobe-acrobat-reader";
import { IconButton } from "../../atoms/Buttons";

type props = {
  tableId?: string;
  columns?: Array<{ header: string; dataKey: string }>;
  orientation?: string;
};
const GeneratePdf: React.FC<props> = ({ tableId = "#table", columns, orientation = "p" }) => {
  const generatePdf = () => {
    const doc = new JsPDF(orientation);

    autoTable(doc, { html: tableId, columns });

    doc.output("dataurlnewwindow");
  };
  return (
    <>
      <IconButton
        borderColor="tomato"
        onClick={generatePdf}
        aria-label="create-pdf"
        icon={<Icon icon={pdf} color="tomato" />}
      />
    </>
  );
};

export default GeneratePdf;
