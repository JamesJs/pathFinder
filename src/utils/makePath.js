import copyArray from "./copyArray";
function makePath(grid, callback, INIT, END) {
  const AUX = copyArray(grid);
  let pathLine = grid[END.line][END.column].parent.line;
  let pathColumn = grid[END.line][END.column].parent.column;
  console.log(grid[13][8].parent.line, grid[13][8].parent.column);
  while (pathLine !== INIT.line || pathColumn !== INIT.column) {
    console.log(pathLine, pathColumn);
    AUX[pathLine][pathColumn].isPath = true;
    let oldPathLine = pathLine;
    pathLine = grid[pathLine][pathColumn].parent.line;
    pathColumn = grid[oldPathLine][pathColumn].parent.column;
  }
  console.log("path feito");
  callback(AUX);
}
export default makePath;
