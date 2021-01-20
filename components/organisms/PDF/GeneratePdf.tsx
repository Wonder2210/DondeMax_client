import React from "react";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Icon } from "@iconify/react";
import pdf from "@iconify/icons-cib/adobe-acrobat-reader";
import { Button } from "../../atoms/Buttons";

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
      <Button
        borderColor="tomato"
        borderWidth="0.75px"
        onClick={generatePdf}
        aria-label="create-pdf"
        leftIcon={<Icon icon={pdf} color="tomato" />}
        backgroundColor="white"
        color="black"
        height="1.9em"
        width="11em"
        borderRadius="8px"
        fontWeight="medium"
      >
        Generar PDF
      </Button>
    </>
  );
};

export default GeneratePdf;
