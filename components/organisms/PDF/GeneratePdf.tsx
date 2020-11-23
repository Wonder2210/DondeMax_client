import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IconButton } from "../../atoms/Buttons";
import pdf from "@iconify/icons-cib/adobe-acrobat-reader";

import { Icon } from "@iconify/react";
type props = {
  tableId?: string;
  columns?: Array<{ header: string; dataKey: string }>;
};
const GeneratePdf: React.FC<props> = ({ tableId = "#table", columns }) => {
  const generatePdf = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: tableId, columns: columns });

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
