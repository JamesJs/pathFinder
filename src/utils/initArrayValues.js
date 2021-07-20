function initArray(aux, END) {
  aux.forEach((column, index) => {
    column.forEach((node, index2) => {
      const NODE = {
        visited: false,
        parent: {},
        obstacle: false,
        count: 0,
        isPath: false,
      };
      aux[index][index2] = NODE;
      if (index === END.line && index2 === END.column) {
        aux[index][index2].isEnd = true;
      }
    });
  });
}

export default initArray;
