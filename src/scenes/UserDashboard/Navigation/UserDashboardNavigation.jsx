import React from 'react'
import {
    Button
} from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import classes from './UserDashboardNavigation.module.css';

export const UserDashboardNavigation = () => {

    const data = useParams();
    console.log(data);

    return (
        <div>
            <header>
                <nav className={classes.list}>
                    <NavLink sx={{ gridColumn: "span 2" }}
                        style={{ marginRight: "5px" }}
                        to='/dashboard' className={({ isActive }) => {
                            return isActive ? classes.active : undefined;
                        }}
                        end
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={{ marginBottom: "10px" }}

                        >
                            Assigned Assets
                        </Button>
                    </NavLink>

                    <NavLink sx={{ gridColumn: "span 2" }} to='assignedassethistory' className={({ isActive }) => {
                        return isActive ? classes.active : undefined
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
