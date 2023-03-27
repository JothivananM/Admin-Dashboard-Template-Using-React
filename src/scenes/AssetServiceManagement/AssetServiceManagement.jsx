import * as React from "react";
import TextField from "@mui/material/TextField";
import SaveCancelButtonUI from "./SaveCancelButtonUI";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import classes from "./card.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AssetServiceManagement() {
  return (
    <div>
      <div>
        <Card sx={{ minWidth: 300 }} className={classes.main}>
          <CardContent className={classes.cardcontent}>
            <TextField label="Asset ID" fullWidth />
          </CardContent>
          <CardContent className={classes.cardcontent}>
            <TextField label="Asset Name" fullWidth />
          </CardContent>
          <CardContent className={classes.cardcontent}>
            <TextField label="Request ID" fullWidth />
          </CardContent>
          <CardContent className={classes.cardcontent}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Request Date" />
            </LocalizationProvider>
          </CardContent>

          <CardContent className={classes.cardcontent}>
            <TextField label="Service ID" fullWidth />
          </CardContent>

          <CardContent className={classes.cardcontent}>
            <TextField label="Service Provider" fullWidth />
          </CardContent>

          <CardContent className={classes.cardcontent}>
            <TextField label="Complain Detail" fullWidth />
          </CardContent>

          <CardContent className={classes.cardcontent}>
            <TextField label="Service Completed detail" fullWidth />
          </CardContent>

          <CardContent className={classes.cardcontent}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Service Given Date" />
            </LocalizationProvider>
          </CardContent>

          <CardContent>
            <SaveCancelButtonUI />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
