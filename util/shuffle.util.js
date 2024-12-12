export const shuffle = (arr) => {
  const newArr = [...arr];

  for(let i = newArr.length-1; i > 0; i--) {
    const tmp = newArr[i];
    const j = Math.floor(Math.random() * (i + 1));
    newArr[i] = newArr[j];
    newArr[j] = tmp;
    // [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}

