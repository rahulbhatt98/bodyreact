import { useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

// ** components ****
// import Header from "../headers";
// import Addvertisement from "../addvertisementCard";
// import MediaFooter from "../footers/mediaFooter";
// import Footer from "../footers";
import Account from "../../pages/account";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: "var( --backgroun-color)",
    },
  })
);

interface Props {
  children?: any;
  history?: any;
  data?: any;
}
function PrivateContainer({
  children,
  history,
  data

}: Props) {
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const pathname = history.location.pathname
    if (!pathname.includes("/shopping-bag") && !pathname.includes("/order/detail")) {
      localStorage.removeItem("isMembershipAdded")
    }
  }, [history.location.pathname])

  // React.useEffect(() => {
  //   if (!isAuthenticated()) {
  //     history.push("/")
  //   }
  // }, [isAuthenticated()])


  return (
    <div className={classes.root}>
      {/* <Header />
      <Hidden xsDown>
        <MiniHeader />
        <Addvertisement />
      </Hidden> */}
      {data?.section === "profile" ? <Account>{children}</Account> : children}


      {/* <Hidden xsDown>
        <MediaFooter />
        <Footer />
      </Hidden> */}

    </div>
  )
}

export default PrivateContainer;