import React, { useState } from "react";
import SearchList from "./searchList";
import {
  makeStyles,
  createStyles,
  Input,
  Button,
} from "@material-ui/core";
import images from "../../utils/images";

const useStyles = makeStyles((theme) =>
  createStyles({
    searchDiv: {
      display: "flex",
      position: "relative",
    },
    searchInput: {
      backgroundColor: "var(--white)",
      padding: theme.spacing(0.5, 1),
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.4
      )}px Work Sans`,
      height: "54px",
      flexBasis: "70%",
      width: 400,
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        textOverflow: "ellipse",
        padding: theme.spacing(0.5, 4, 0.5, 1),
      },
    },
    sendButton: {
      font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
        1.5
      )}px Work Sans`,
      borderRadius: "4px",
      color: theme.palette.primary.main,
      padding: theme.spacing(1, 3.5),
      flexBasis: "30%",
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.2),
      },
    },
    searchIcon: {
      top: "15px",
      right: "32%",
      position: "absolute",
      zIndex: 1,
    },
    searchContainer: {
      display: "flex",
      justifyContent: "center",
      textAlign: "left",
      margin: theme.spacing(8, 0, 0, 0),
    },
  })
);

function Search({ details }: any) {
  const classes = useStyles();

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const filteredPersons = details.filter((person: any) => {
    return (
      person.name.toLowerCase().includes(searchField.toLowerCase()) ||
      person.email.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e: any) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };


  function searchList() {
    if (searchShow) {
      return (
        <SearchList filteredPersons={filteredPersons} />
      );
    }
  }

  return (
    <React.Fragment>
      <section className={classes.searchContainer}>
        <div className={classes.searchDiv}>
          <Input
            type="search"
            placeholder="Search by city, town and Pincode"
            onChange={handleChange}
            disableUnderline
            className={classes.searchInput}
          />
          <img
            src={images.SEARCH_LOCATION}
            alt="search"
            className={classes.searchIcon}
          />
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            className={classes.sendButton}

          >
            Find Store
          </Button>
        </div>

      </section>

      <div>{searchList()}</div>
    </React.Fragment>
  );
}

export default Search;
