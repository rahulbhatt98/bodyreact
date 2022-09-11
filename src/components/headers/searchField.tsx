import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Utils from "../../utils";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: "#ebf2f1",
    backgroundColor: "#c6d9d647",
    "&:hover": {
      backgroundColor: "#ebf2f1",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("xs")]: {
      color: "var(--primary)",
      font: "600 14px Work Sans",
      lineHeight: "16px",
    },
  },
  searchFieldDiv: {
    margin: theme.spacing(1, 0),
  },
}));

export default function SearchField({ handleClick, value, clearSearch }: any) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className={classes.searchFieldDiv}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <img src={Utils.images.SEARCHICON} alt="google" />
          </div>
          <InputBase
            // autoFocus={true}
            autoFocus={false}
            placeholder="Search for products, brands etc"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={value ?? ""}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => handleClick(e)}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && e.target.value) {
                dispatch({
                  type: 'getProductList',
                  payload: {}
                })
                let url = `${Utils.CommonFunctions.replaceUrlParams(Utils.routes.PRODUCT_SEARCH_LIST, { ":keyword": e.target.value })}?isSearched=true`
                history.push(url);
              }
            }}
            endAdornment={
              <>
                {value && (
                  <img
                    style={{ margin: 10 }}
                    src={Utils.images.FILTER_CROSS}
                    alt="clear"
                    onClick={clearSearch}
                  />
                )}
              </>
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
}
