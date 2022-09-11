import { Hidden } from "@material-ui/core";
import { useEffect } from "react";
import { screenViewed } from "../../utils/event/action";
import events from "../../utils/event/constant";
/**
 * Components
 */
import Banner from "./banner";
import FilterProducts from "./filterProducts";
import MobileMenu from "./mobileMenu";
import MobileFilterProducts from "./mobileFilterProducts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReducersModal } from "../../models";


const ProductListing = () => {
  const params: any = useParams()
  const URLPath = useSelector(
    (state: ReducersModal) => state.productReducer?.data?.categoryData?.urlPath
  );
  let keyword = params?.keyword ?? "";

  useEffect(() => {
    /**
     * Event logger
     */
    const URLPathArray = URLPath && URLPath.split('/')

    if(URLPathArray && URLPathArray.length > 1){
      screenViewed({
        ScreenName: events.SCREEN_SUB_CATEGORY_PLP,
        CTGenerated: "WEB"
      })
    } else {
      screenViewed({
        ScreenName: keyword ? events.SCREEN_PLP_SEARCH : events.SCREEN_PLP,
        CTGenerated: "WEB"
      })      
    }
  }, [URLPath])

  return (
    <div id={"banner-id"}  >

      {!keyword &&
        <Hidden smUp>
          <MobileMenu />
        </Hidden>
      }
      <Banner />
      <Hidden xsDown><FilterProducts /></Hidden>
      <Hidden smUp><MobileFilterProducts /></Hidden>

      {/* <ListProducts /> */}
    </div>
  );
};

export default ProductListing;
