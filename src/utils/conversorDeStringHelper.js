module.exports = (objetoParams) => {
  for (let propriedade in objetoParams) {
    if (/Id|id/.test(propriedade)) {
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
    if (objetoParams[propriedade] === 'true') {
      objetoParams[propriedade] = true;
    }
    if (objetoParams[propriedade] === 'false') {
      objetoParams[propriedade] = false;
    }
      
    return objetoParams;
  }
};