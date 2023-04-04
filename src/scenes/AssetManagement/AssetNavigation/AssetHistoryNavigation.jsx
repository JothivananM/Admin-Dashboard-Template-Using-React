import React from 'react'
import {
  Button
} from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import classes from './AssetHistoryNavigation.module.css';

export const AssetHistoryNavigation = () => {

  const data = useParams();
  console.log(data);

  return (
    <div>
      <header>
        <nav className={classes.list}>
          <NavLink to='' className={({ isActive }) => {
            return isActive ? classes.active : undefined;
          }}
            end
          >

            <Button
              variant="outlined"
              color="secondary"
              style={{ marginRight: "5px" }}
            >
              Maintenance History
            </Button>
          </NavLink>
          <NavLink to='assignedhistory' className={({ isActive }) => {
            return isActive ? classes.active : undefined
          }
          }>
            <Button
              variant="outlined"
              color="secondary"
            >
              Assigned History
            </Button>
          </NavLink>

        </nav>
      </header>

    </div>
  )
}
