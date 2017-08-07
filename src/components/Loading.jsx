// @flow
import React from 'react';

import './Loading.css';

const Loading = ({message}: {message: string}) => (
  <div className="Loading">
    <i className="fa fa-cog fa-4x fa-spin"/>
    {message}
  </div>
);

export default Loading;
