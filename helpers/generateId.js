const generateId = () => {
  const mathRandom = Math.random().toString(32).substring(2);
  const dateNow = Date.now().toString(32);
  return (mathRandom + dateNow);
}

export default generateId;