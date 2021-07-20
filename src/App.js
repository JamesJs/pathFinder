import { useEffect, useRef, useState } from "react";
import "./App.css";
import queueActions from "./algorithms/queue";
import copyArray from "./utils/copyArray";
import bfs from "./algorithms/bfs";
import initArray from "./utils/initArrayValues";
import Square from "./components/square";

const LINES = 20;
const COLUMNS = 15;

function App() {
  //Functions

  const onMouseDownHandler = (e) => {
    e.preventDefault();
  };
  const onMouseOverHandler = (e, line, column) => {
    if (e.buttons === 1) {
      createObstacle(e, line, column);
    }
  };
  const onAuxClickHandler = (e, line, column) => {
    e.preventDefault();
    if (start) return;

    setEndHandler(line, column);
    return false;
  };
  const onContextMenuHandler = (e, line, column) => {
    e.preventDefault();
    setInitHandler(line, column);
  };
  const onClickHandler = (e, line, column) => {
    createObstacle(e, line, column);
  };
  function setEndHandler(line, column) {
    setEnd({
      line,
      column,
    });
  }
  function setInitHandler(line, column) {
    if (start) return;

    grid[INIT.line][INIT.column].visited = false;
    setInit({
      line,
      column,
    });
    grid[line][column].visited = true;
    queueActions.dequeue(queueLine);
    queueActions.dequeue(queueColumn);
    queueActions.enqueue(queueLine, line);
    queueActions.enqueue(queueColumn, column);

    return false;
  }

  function createObstacle(e, line, column) {
    e.preventDefault();
    if (
      (line === INIT.line && column === INIT.column) ||
      (line === END.line && column === END.column) ||
      start
    )
      return;
    const aux = [...grid];
    grid.forEach((column, index) => {
      aux[index] = [...column];
    });
    aux[line][column].obstacle = !aux[line][column].obstacle;
    setGrid(aux);
  }

  //Hooks

  const [INIT, setInit] = useState({
    line: 3,
    column: 10,
  });
  const [END, setEnd] = useState({
    line: 19,
    column: 8,
  });
  const queueLine = useRef([INIT.line]);
  const queueColumn = useRef([INIT.column]);
  const alreadyEnd = useRef(false);
  const [start, setStart] = useState(false);
  const nextLayer = useRef(0);
  const firstTime = useRef(true);
  const count = useRef(0);
  const [grid, setGrid] = useState(new Array(LINES).fill(new Array(COLUMNS)));

  //UseEffects

  useEffect(() => {
    console.log("No use effect");
    if (firstTime.current) {
      const aux = copyArray(grid);
      initArray(aux, END);
      setGrid(aux);
      firstTime.current = false;
      return;
    }
    if (!start) return;
    if (alreadyEnd.current) {
      alreadyEnd.current = false;
      setStart(false);
    }
    bfs(
      LINES,
      COLUMNS,
      alreadyEnd,
      queueLine,
      queueColumn,
      grid,
      nextLayer,
      count,
      (aux) => {
        console.log("renderizou");
        setGrid(aux);
      },
      INIT,
      END
    );
  }, [grid, start]);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {grid.map((columns, line) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {columns.map((node, column) => (
                <Square
                  key={`${(column + line) / column / line}`}
                  onClick={(e) => {
                    onClickHandler(e, line, column);
                  }}
                  onContextMenu={(e) => {
                    onContextMenuHandler(e, line, column);
                  }}
                  onMouseDown={(e) => {
                    onMouseDownHandler(e);
                  }}
                  onMouseOver={(e) => {
                    onMouseOverHandler(e, line, column);
                  }}
                  END={END}
                  INIT={INIT}
                  onAuxClick={(e) => {
                    onAuxClickHandler(e, line, column);
                  }}
                  line={line}
                  column={column}
                  grid={grid}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div style={{ marginTop: "10%" }}>
          <h1>Path finder</h1>
        </div>
        <div
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",

            display: "flex",
            marginBottom: "3%",
            flex: 1,
            maxHeight: 200,
          }}
        >
          <button
            disabled={start}
            onClick={() => {
              setStart(true);
            }}
          >
            BFS
          </button>
          <button
            disabled={start}
            onClick={() => {
              setStart(true);
            }}
          >
            DFS
          </button>
        </div>
        <button
          disabled={start}
          style={{
            width: "50%",
            alignSelf: "center",
          }}
          onClick={() => {
            setStart(true);
          }}
        >
          Limpar tela
        </button>
      </div>
    </div>
  );
}

export default App;
