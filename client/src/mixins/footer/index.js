import React from 'react'; 
import { withRouter } from 'react-router-dom'; 
import '../../modules/styles/base.scss';

const FooterComponent = () => (
    <footer>
      <div>
        <p class='footer-log-left'> Eat fast, die ? okay.</p>
        <p class='get-fed-button'> Get fed right away <span> <svg id="i-heart" viewBox="0 0 32 32" width="15" height="15" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
    </svg></span>. </p>
      </div>
      <p class='footer-log-right'> Check the code on github</p>
    </footer>
)

export default withRouter(FooterComponent);