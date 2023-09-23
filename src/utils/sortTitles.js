const sortTitlesAZ = (a, b) => {
  const objectA = a.title.toLowerCase();
  const objectB = b.title.toLowerCase();
  return objectA < objectB ? -1 : 1;
};

const sortTitlesZA = (a, b) => {
  const objectA = a.title.toLowerCase();
  const objectB = b.title.toLowerCase();
  return objectA < objectB ? 1 : -1;
};

export { sortTitlesAZ, sortTitlesZA };
