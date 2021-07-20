const queueActions = {
  enqueue: (queue, value) => {
    queue?.current?.push(value);
  },
  dequeue: (queue) => {
    return queue?.current?.shift();
  },
};
export default queueActions;
