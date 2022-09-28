import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

import { Link, useHistory } from 'react-router-dom';

const preventDefault = (event) => {
  event.preventDefault();
}

const Deposits = ({title, count, url, redirectName, svg}) => {
  return (
    <React.Fragment>
      <Title>{title} - {count}</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }} style={{display:"flex", justifyContent: "center"}}>
        <img src={svg} loading="lazy" style={{width:"60%"}}/>
      </Typography>
      <div>
        <Link color="primary" to={url} style={{float:"right"}}>
            {redirectName}
        </Link>
      </div>
    </React.Fragment>
  );
}
export default Deposits
