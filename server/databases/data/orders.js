const orders = {
  1: {
    created: Date.now(),
    content: {
      1: {
        items: [1, 3, 4],
        processed: true
      },
      2: {
        items: [1, 2, 3],
        processed: true
      },
      5: {
        items: [1, 2],
        processed: true
      }
    },
    client: 1,
  },
  2: {
    created: Date.now(),
    content: {
      1: {
        items: [1, 2, 3],
        processed: true
      },
    }
  },
  3: {
    content: {
      2: {

      },
    }
  }
};

export default orders;
