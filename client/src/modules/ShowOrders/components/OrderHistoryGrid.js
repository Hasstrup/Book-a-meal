import React from 'react';
import MultipleHistory from '../../../mixins/cards/SingleOrderHistoryCard';

export default ({ title }) => (
  <div className="today-story">
    <div className="today-text">
      <div className="today-introduction">
        <p className="today-intro"> { title } </p>
        <p className="today-intro-desc">
               This is a collection of all the batches of items
               you paid for today. Had dinner yet?
        </p>
      </div>
    </div>
    { /* This is the damn ting */}
    <div className="order-story-grid">
      { MultipleHistory([1, 2, 3, 4])({})}
    </div>
  </div>
);
