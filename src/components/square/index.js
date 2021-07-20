export default function Square({
  INIT,
  END,
  line,
  column,
  grid,
  onMouseDown,
  onMouseOver,
  onAuxClick,
  onContextMenu,
  onClick,
}) {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onAuxClick={onAuxClick}
      onContextMenu={onContextMenu}
      onClick={onClick}
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
    />
  );
}
