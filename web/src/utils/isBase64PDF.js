export const isBase64PDF = (base64String) => {
  const regex = /^data:application\/pdf;base64,/;
  return regex.test(base64String);
}