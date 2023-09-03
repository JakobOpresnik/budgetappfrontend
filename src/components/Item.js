import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Button, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Dropdown from './Dropdown';
import UpdateItem from './UpdateItem';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Item() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const classes = useStyles();
  const formStyle = {padding: '0px 20px', margin: '20px auto'}
  const titleStyle = {padding: "30px 0px 0px 0px", fontWeight: 'bold'}
  const paperStyle = {padding:'50px 20px', width:600, margin:"20px auto"}
  const addButtonStyle = {margin: "20px 15px 10px 0px", background: "#ffc114"}
  const deleteButtonStyle = {margin: "20px 15px 10px 0px"}
  const updateButtonStyle = {margin: "20px 15px 10px 0px", background: "#297eff"}


  useEffect(() => {
    fetch("http://localhost:8080/item/getAll")
    .then(res => res.json())
    .then((result) => {
        setItems(result);
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    const item = {name, price, type}
    console.log(item)
    fetch("http://localhost:8080/item/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
    }).then(() => {
        console.log("new item added")
    })
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setType(option);
  };

  const handleDeletion = (id) => {
    const item = items.find(item => item.id === id);
    console.log(item);
    fetch("http://localhost:8080/item/delete", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
    }).then(() => {
        console.log("item deleted")
    })
  }

  const handleUpdate = (id) => {
    const item = items.find(item => item.id === id);
    console.log(item);
    if (showUpdateForm) {
        fetch("http://localhost:8080/item/update/"+id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }).then(() => {
            console.log("item updated")
        })
    }
    setShowUpdateForm(!showUpdateForm);
  }

  /*const navigate = useNavigate();

  const navigateUpdate = () => {
    navigate("/update/:id");
  }*/


  return (
    <div>
        <Typography variant="h6" style={titleStyle}>
            ADD ITEM:
        </Typography>
        <form className={classes.root} noValidate autoComplete='off' style={formStyle}>
            <TextField id="item_name" label="item name" variant="outlined" onChange={(e) => setName(e.target.value)} />
            <TextField id="item_price" label="item price" variant="outlined" type='number' onChange={(e) => setPrice(e.target.value)} />
        </form>
        <Dropdown onOptionChange={handleOptionChange}/>
        <Button variant="contained" color="secondary" style={addButtonStyle} onClick={handleSubmit}>
            ADD
        </Button>
        <Typography variant="h6" style={titleStyle}>
            {selectedOption}
        </Typography>

        <Paper elevation={3} style={paperStyle}>
        {items.map(item => (
                <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign: "left"}} key={item.id}>
                    <Typography variant="h6">
                        id: {item.id}
                    </Typography>
                    <Typography variant="h6">
                        name: {item.name}
                    </Typography>
                    <Typography variant="h6">
                        price: {item.price}
                    </Typography>
                    <Typography variant="h6">
                        type: {item.type}
                    </Typography>
                    <Button variant="contained" color="secondary" style={deleteButtonStyle} onClick={() => handleDeletion(item.id)}>
                        DELETE
                    </Button>
                    <Button variant="contained" color="primary" style={updateButtonStyle} onClick={() => handleUpdate(item.id)}>
                        UPDATE
                    </Button>
                    {showUpdateForm && <UpdateItem/>}
                </Paper>
            ))}
        </Paper>
    </div>
  )
}