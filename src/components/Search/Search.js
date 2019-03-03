import React from "react";
import PropTypes from "prop-types";
import "./Search.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Forward from "@material-ui/icons/Forward";

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
      <Button variant="contained" color="primary" className="button" onClick={onSearchHandler}>
        Parse
        <Forward className="rightIcon" />
      </Button>
    </div>
  );
};

Search.propTypes = {
  onChangeHandler: PropTypes.func,
  onSearchHandler: PropTypes.func
};

export default Search;
