const orders = {
  1: {
    created: Date.now(),
    content: {
      1: {
        items: [2, 3],
        processed: true
      },
      2: {
        items: [4,3],
        processed: true
      },
      5: {
        items: [3, 3],
        processed: true
      }
    },
    client: 1,
  },

  2: {
    created: Date.now(),
    content: {
      2: {
        items: [3, 4, 1],
        processed: false
      },
    },
    client: 2
  }
};


export default orders;
