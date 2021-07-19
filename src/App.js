import { useEffect, useState } from "react";
import "./App.css";
const node = {
  visited: false,
};
function Square({ line, column, grid, onClick }) {
  return (
    <div
      onClick={() => {
        console.log(line, column);
        const aux = [...grid];
        grid[line][column].visited = !grid[line][column].visited;
        console.log(grid);
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

function App() {
  const INIT = {
    line: 2,
    column: 3,
  };
  const END = {
    line: 19,
    column: 8,
  };
  useEffect(() => {
    const aux = [...grid];
    console.log(aux);
    grid.forEach((column, index) => {
      aux[index] = [...column];
    });
    aux.forEach((column, index) => {
      column.forEach((node, index2) => {
        aux[index][index2] = { visited: false, parent: {}, obstacle: false };
        if (index === END.line && index2 === END.column) {
          aux[index][index2].isEnd = true;
        }
      });
    });
    console.log(aux);
    setGrid(aux);
  }, []);
  const [grid, setGrid] = useState(new Array(20).fill(new Array(15)));
  function createObstacle(e, line, column) {
    e.preventDefault();
    console.log(line, column);
    const aux = [...grid];
    grid.forEach((column, index) => {
      aux[index] = [...column];
    });
    aux[line][column].obstacle = !aux[line][column].obstacle;
    console.log(aux);
    setGrid(aux);
  }
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
                      : "white",
                  width: 50,
                  height: 50,
                }}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
