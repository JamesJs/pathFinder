export default function copyArray(array) {
  const AUX = [...array];
  array.forEach((column, index) => {
    AUX[index] = [...column];
  });
  return AUX;
}
