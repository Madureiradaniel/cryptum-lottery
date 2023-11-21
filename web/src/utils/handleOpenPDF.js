export const handleOpenPDF = (base64) => {
    const win = window.open();
    win.document.write(`
      <iframe width="100%" height="100%" src="${base64}">
      </iframe>
    `);
  };