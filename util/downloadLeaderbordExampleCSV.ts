
type ColumnConfig = {
  key: string;
  type: string | number;
};


const downloadLeaderbordExampleCSV = (columnsConfig:ColumnConfig[]) => {
  const headers = columnsConfig.map((col) => col.key);
  const values = columnsConfig.map((col) =>
    col.type === "number" ? 1 : "test"
  );

  const csvContent = [headers.join(","), values.join(",")].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "example.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export default downloadLeaderbordExampleCSV