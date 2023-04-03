import React from 'react'
import {
    Button
} from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
// import classes from './AssetHistoryNavigation.module.css';

export const UserDashboardNavigation = () => {

    const data = useParams();
    console.log(data);

    return (
        <div>
            <header>
                <nav>
                    <NavLink to='/dashboard' className={({ isActive }) => {
                        return isActive ? '': undefined;
                    }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={{ marginBottom: "10px" }}

                        >
                            Assigned Assets
                        </Button>
                    </NavLink>
                    <NavLink to='assignedassethistory' className={({ isActive }) => {
                        return isActive ? '' : undefined
                    }
                    }>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={{ marginBottom: "10px" }}

                        >
                            Assigned Asset History
                        </Button>
                    </NavLink>

                </nav>
            </header>

        </div>
    )
}
