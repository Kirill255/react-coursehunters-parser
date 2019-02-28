import React from "react";
import "./Search.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Search = ({ onChangeHandler, onSearchHandler }) => {
  return (
    <div>
      <TextField
        id="search"
        label="Search field"
        type="search"
        className="search"
        placeholder="Give me a link"
        margin="normal"
        autoFocus={true}
        fullWidth={true}
        variant="outlined"
        onChange={onChangeHandler}
      />
      <Button variant="contained" color="secondary" className="button" onClick={onSearchHandler}>
        Go parse
      </Button>
    </div>
  );
};

export default Search;
