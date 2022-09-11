import {
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Tab,
  Divider,
  
  Box,
} from "@material-ui/core";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import CustomButton from "../../../../components/common/button";
import CustomCheckbox from "../../../../components/common/customCheckbox";
import Utils from "../../../../utils";
import DateField from "./dateField";

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const data = ["Earned", "Redeemed", "Expired", "Bonus Points"];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    // height:'500px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    display: "block",
    alignItems: "center",
    borderRadius: "3px",
    width: "460px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      borderRadius: "12px",
    },
  },
  heading: {
    font: `normal ${theme.typography.fontWeightBold} ${theme.spacing(
      2.6
    )}px Recoleta Alt`,
    color: "var(--secondary-black)",
  },
  innerContainer: {
    display: "flex",
    width: "100%",
    padding: theme.spacing(1, 0, 0, 0),
  },
  img: {
    cursor: "pointer",
  },
  imgIcon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2, 2.5),
  },
  box: {
    flexGrow: 1,
    bgcolor: "background.paper",
    display: "flex",
  },
  tabs: {
    borderRight: "1px solid var(--text-color)",
    "& .Mui-selected": {
      background: "var(--main-opacity) !important",
      color: "var(--white)!important",
      font: `normal ${theme.typography.fontWeightRegular} ${theme.spacing(
        1.6
      )}px Work Sans SemiBold !important`,
    },
    "& .MuiTab-wrapper": {
      textTransform: "capitalize",
    },
    "& .MuiTabs-indicator": {
      background: "var(--main-opacity)",
    },
    "& .MuiTab-textColorPrimary": {
      background: "var(--backgroun-color)",
    },
  },
  title: {
    font: `normal ${theme.typography.fontWeightMedium} ${theme.spacing(
      1.4
    )}px Work Sans Medium`,
    color: "var(--black)",
  },
  tabsDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(1.2, 0),
  },
  btnDiv: {
    display: "flex",
    padding: theme.spacing(2),
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  boxContainer: {
    flexBasis: "65%",
    padding: theme.spacing(0, 2),
  },
}));
const FilterList = (props: Props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        className={classes.boxContainer}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div className={classes.imgIcon}>
              <Typography variant="h4" className={classes.heading}>
                Apply Filter
              </Typography>
              <div className={classes.img} onClick={props.handleClose}>
                <img src={Utils.images.CROSS} alt="cross_icon" />
              </div>
            </div>
            <Box className={classes.box}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                // sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="Status" {...a11yProps(0)} />
                <Tab label="Date " {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                {data.map((item: any, index: any) => (
                  <div className={classes.tabsDiv} key={index}>
                    <Typography variant="h4" className={classes.title}>
                      {item}
                    </Typography>
                    <CustomCheckbox />
                  </div>
                ))}
              </TabPanel>
              <TabPanel value={value} index={1}>
               <DateField />
              </TabPanel>
            </Box>
            <Divider light />
            <div className={classes.btnDiv}>
              <CustomButton
                text={"Clear All"}
                type="submit"
                variant="outlined"
                fullWidth
              />
              <CustomButton
                text={"Apply"}
                type="submit"
                variant="contained"
                fullWidth
              />
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default FilterList;
