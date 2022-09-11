import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
} from "@material-ui/core";
import Utils from "../../../utils";
import CustomCheckbox from "../../../components/common/customCheckbox";
import CustomButton from "../../../components/common/button";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  handleClose: () => void;
  getItems: Function;
  handleFilterClose: Function;
  setPage: Function;
  filters: any;
  resetFilters: Function;
  setFilters: Function;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(2, 2, 2, 2),
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: "400px",
    height: "85%",
    // overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      height: "85%",
      bottom: 0,
      position: "fixed",
      background: "white",
      zIndex: 9
      // overflowY: "auto",
    },
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.6
    )}px Recoleta Alt`,
    lineHeight: "35px",
    marginBottom: "20px",
    letterSpacing: "0.02em",
    color: "var(--secondary-black)",
  },
  formContainer: {
    overflowY: "auto",
    paddingRight: theme.spacing(5),
    height: "55vh",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "0px",
    },
  },
  inputLabel: {
    font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
      1.4
    )}px Work Sans`,
    lineHeight: "16px",
    color: "var(--black)",
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    width: "48%",
  },
  img: {
    cursor: "pointer",
  },
  footerPanel: {
    position: "sticky",
    bottom: "50px",
    [theme.breakpoints.down("xs")]:{
      bottom: "20px"
    }
  },
}));
const FilterModal: React.FC<any> = (props: Props) => {
  const [checkedList, setCheckedList] = useState<any>([]);
  const classes = useStyles();
  const {
    handleClose,
    open,
    resetFilters,
    setPage,
    filters,
    setFilters,
    handleFilterClose,
  } = props;
  const dispatch = useDispatch();

  const onChange = (e: any, id: number) => {
    let checkedArr: any = [...checkedList];
    dispatch({ type: "orderHistoryList", payload: [] });
    dispatch({ type: "orderHistoryData", payload: {} });
    setPage(0);
    if (e.target.checked) {
      if (!checkedArr.includes(id)) {
        checkedArr = [...checkedArr, id];
        setCheckedList([...checkedArr]);
      }
    } else if (!e.target.checked) {
      if (checkedArr.includes(id)) {
        checkedArr = checkedArr.filter((item: number) => item !== id);
        setCheckedList([...checkedArr]);
      }
    }
  };

  const clearAll = () => {
    dispatch({ type: "orderHistoryData", payload: {} });
    dispatch({ type: "orderHistoryList", payload: [] });
    setCheckedList([]);
    resetFilters([]);
  };

  // const filterOptions = Utils.constants.filterOption.filter(
  //   (item: any) => item.id !==3&&item.id !== 5&&item.id !== 6
  // );
  const filterOptions = Utils.constants.filterOption.filter(
    (item: any) => [1,2,4,7,9,10,12].includes(item.id)
  );
  const filterReset = resetFilters;
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {
          setPage(0);
          if (checkedList.length !== filters.length) {
            setCheckedList(filters);
            filterReset([...filters]);
            handleFilterClose();
          } else {
            setFilters([...checkedList]);
            handleClose();
          }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div>
              <div className={classes.innerContainer}>
                <Typography variant="h4" className={classes.heading}>
                  Apply Filter
                </Typography>
                <div
                  onClick={() => {
                    setPage(0);
                    if (checkedList.length !== filters.length) {
                      setCheckedList(filters);
                      filterReset([...filters]);
                      handleFilterClose();
                    } else {
                      setFilters([...checkedList]);
                      handleClose();
                    }
                  }}
                >
                  <img
                    src={Utils.images.CROSS}
                    alt="crossIcon"
                    className={classes.img}
                  />
                </div>
              </div>
              <div className={classes.formContainer}>
                {filterOptions.map((item: any) => {
                  return (
                    <div className={classes.innerContainer} key={item.id}>
                      <Typography
                        variant="body1"
                        className={classes.inputLabel}
                      >
                        {item.label}
                      </Typography>
                      <CustomCheckbox
                        key={item.id}
                        value={item.id}
                        id={String(item.id)}
                        checked={
                          checkedList.length > 0 &&
                          checkedList.includes(item.id)
                            ? true
                            : false
                        }
                        // checked={filters.length > 0 && filters.includes(item.id) ? true : false}
                        onChange={(e: any) => onChange(e, item.id)}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={classes.footerPanel}>
                <Divider light className={classes.divider} />
                <div className={classes.buttonContainer}>
                  <div className={classes.btn}>
                    <CustomButton
                      fullWidth
                      type={"submit"}
                      text={"Clear All"}
                      variant={"outlined"}
                      onClick={clearAll}
                    />
                  </div>
                  <div className={classes.btn}>
                    <CustomButton
                      disabled={checkedList.length === 0}
                      fullWidth
                      type={"submit"}
                      text={"Apply"}
                      variant={"contained"}
                      onClick={() => resetFilters([...checkedList])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default FilterModal;
