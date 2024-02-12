import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.sass';
import '../../styles/setup/variables.sass';

const Preloader: FC = () => {
    return (
        <div className="preloader">
            <CircularProgress />
        </div>
    );
};

export default Preloader;
