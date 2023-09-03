import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function UpdateItem({ onItemUpdate }) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const classes = useStyles();
  const formStyle = {padding: '0px 20px', margin: '20px auto'}

  const handleUpdate = ({newName, newPrice}) => {
    const item = {newName, newPrice}
    onItemUpdate(item);
  }

  return (
    <div className={classes.root}>
        <form className={classes.root} noValidate autoComplete='off' style={formStyle}>
            <TextField id="item_name" label="item name" variant="outlined" onChange={(e) => setName(e.target.value)} />
            <TextField id="item_price" label="item price" variant="outlined" type='number' onChange={(e) => setPrice(e.target.value)} />
        </form>
    </div>
  );
}