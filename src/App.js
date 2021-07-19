import { useEffect, useRef, useState } from "react";
import "./App.css";
const node = {
  visited: false,
};
function makePath(grid, callback) {
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
function Square({ line, column, grid, onClick }) {
  return (
    <div
      onClick={() => {
        const aux = [...grid];
        grid[line][column].visited = !grid[line][column].visited;
        grid.forEach((column, index) => {
          aux[index] = [...column];
        });
        //aux[line][column].visited = !aux[line][column].visited;
        //console.log(aux);
        //onClick(aux);
      }}
      className="square"
      style={{
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: grid[line][column].visited ? "red" : "blue",
        width: 50,
        height: 50,
      }}
    ></div>
  );
}
const INIT = {
  line: 3,
  column: 10,
};
const END = {
  line: 19,
  column: 8,
};
const queueActions = {
  enqueue: (queue, value) => {
    queue?.current?.push(value);
  },
  dequeue: (queue) => {
    return queue?.current?.shift();
  },
};
const LINES = 20;
const COLUMNS = 15;
const bfs = (
  end,
  queueLine,
  queueColumn,
  grid,
  restInLayer,
  nextLayer,
  count,
  callback
) => {
  const AUX = copyArray(grid);
  const HORIZONTAL = [0, 1, 0, -1];
  const VERTICAL = [1, 0, -1, 0];

  if (
    (queueLine.current.length === 0 && queueColumn.current.length === 0) ||
    end.current
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
    end.current = true;
    makePath(grid, callback);
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

function copyArray(grid) {
  const AUX = [...grid];
  grid.forEach((column, index) => {
    AUX[index] = [...column];
  });
  return AUX;
}

function App() {
  const queueLine = useRef([INIT.line]);
  const queueColumn = useRef([INIT.column]);
  const restInLayer = useRef(1);
  const end = useRef(false);
  const [start, setStart] = useState(false);
  const nextLayer = useRef(0);
  const firstTime = useRef(true);
  const count = useRef(0);
  function initArray(aux) {
    aux.forEach((column, index) => {
      column.forEach((node, index2) => {
        aux[index][index2] = {
          visited: false,
          parent: {},
          obstacle: false,
          count: 0,
          isPath: false,
        };
        if (index === END.line && index2 === END.column) {
          aux[index][index2].isEnd = true;
        }
        if (index === INIT.line && index2 === INIT.column) {
          aux[index][index2].visited = true;
        }
      });
    });
  }

  const [grid, setGrid] = useState(new Array(LINES).fill(new Array(COLUMNS)));
  useEffect(() => {
    console.log("No use effect");
    if (firstTime.current) {
      const aux = copyArray(grid);
      initArray(aux);
      setGrid(aux);
      firstTime.current = false;
      return;
    }
    if (end.current || !start) return;
    bfs(
      end,
      queueLine,
      queueColumn,
      grid,
      restInLayer,
      nextLayer,
      count,
      (aux) => {
        console.log("renderizou");
        setGrid(aux);
      }
    );
  }, [grid, start]);
  function createObstacle(e, line, column) {
    e.preventDefault();
    const aux = [...grid];
    grid.forEach((column, index) => {
      aux[index] = [...column];
    });
    aux[line][column].obstacle = !aux[line][column].obstacle;
    setGrid(aux);
  }
  // useEffect(() => {
  //   bfs(queueLine, queueColumn, grid, restInLayer, nextLayer, count, (aux) => {
  //     setGrid(aux);
  //   });
  // }, [grid]);
  return (
    <div className="App">
      {grid.map((columns, line) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {columns.map((node, column) => (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onMouseOver={(e) => {
                  if (e.buttons === 1) {
                    createObstacle(e, line, column);
                  }
                }}
                onClick={(e) => {
                  createObstacle(e, line, column);
                }}
                className="square"
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  backgroundColor:
                    line === INIT.line && column === INIT.column
                      ? "pink"
                      : line === END.line && column === END.column
                      ? "black"
                      : grid[line][column].obstacle
                      ? "gray"
                      : grid[line][column].isPath
                      ? "yellow"
                      : grid[line][column].visited
                      ? "red"
                      : "white",
                  width: 50,
                  height: 50,
                }}
              ></div>
            ))}
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            setStart(true);
          }}
        >
          Começar
        </button>
      </div>
    </div>
  );
}

export default App;
