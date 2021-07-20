import copyArray from "../utils/copyArray";
import queueActions from "./queue";
import makePath from "../utils/makePath";
const bfs = (
  LINES,
  COLUMNS,
  alreadyEnd,
  queueLine,
  queueColumn,
  grid,
  nextLayer,
  count,
  callback,
  INIT,
  END
) => {
  const AUX = copyArray(grid);
  const HORIZONTAL = [0, 1, 0, -1];
  const VERTICAL = [1, 0, -1, 0];

  if (
    (queueLine.current.length === 0 && queueColumn.current.length === 0) ||
    alreadyEnd.current
  ) {
    console.log("acabou");
    return;
  }
  console.log("Chamou bfs");

  const line = queueActions.dequeue(queueLine);
  const column = queueActions.dequeue(queueColumn);
  if (AUX[line][column]?.isEnd) {
    queueLine.current = [];
    console.log(grid);
    queueColumn.current = [];
    alreadyEnd.current = true;
    makePath(grid, callback, INIT, END);
    return;
  }
  console.log("Passou dos ifs");

  for (let i = 0; i < 4; i++) {
    const NEXT_LINE = HORIZONTAL[i] + line;
    const NEXT_COLUMN = VERTICAL[i] + column;
    if (
      NEXT_LINE >= LINES ||
      NEXT_COLUMN >= COLUMNS ||
      NEXT_LINE < 0 ||
      NEXT_COLUMN < 0
    ) {
      continue;
    }
    if (
      AUX[NEXT_LINE][NEXT_COLUMN]?.visited ||
      AUX[NEXT_LINE][NEXT_COLUMN]?.obstacle
    ) {
      continue;
    }

    queueActions.enqueue(queueLine, NEXT_LINE);
    queueActions.enqueue(queueColumn, NEXT_COLUMN);

    AUX[NEXT_LINE][NEXT_COLUMN].visited = true;
    AUX[NEXT_LINE][NEXT_COLUMN].count = AUX[line][column].count + 1;
    AUX[NEXT_LINE][NEXT_COLUMN].parent = {
      line,
      column,
    };
    nextLayer.current++;
    console.log("nextLine:", NEXT_LINE);
    console.log("nextColumn:", NEXT_COLUMN);
  }
  count.current++;

  setTimeout(() => {
    console.log("contador", count.current);
    callback(AUX);
  }, 50);

  return;
};

export default bfs;
