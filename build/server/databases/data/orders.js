"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var orders = {
  1: {
    created: Date.now(),
    content: {
      1: {
        items: [2, 3],
        processed: false
      },
      2: {
        items: [4, 3],
        processed: false
      },
      5: {
        items: [3, 3],
        processed: false
      }
    },
    client: 1
  },

  2: {
    created: Date.now(),
    content: {
      2: {
        items: [3, 4, 1],
        processed: false
      }
    },
    client: 2
  }
};

exports.default = orders;