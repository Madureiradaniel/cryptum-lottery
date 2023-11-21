export const handleOpenImage = (base64) => {
    const win = window.open();
    win.document.write(`<img src="${base64}" alt="Base64 Image" />`);
  };