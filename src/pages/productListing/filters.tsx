import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Divider,
  Chip,
  Link
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "./action";
import { ReducersModal } from "../../models";
import FilterContent from "./filterContent";
import Utils from "../../utils";
import { hideLoader, showLoader } from "../home/actions";
import { useHistory } from "react-router-dom";
import { filter } from "lodash";
import { isTypeNode } from "typescript";
import { debug } from "util";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterContainer: {

      // position: "relative",
      // marginTop: "16px",
      // '& p': {
      //   font: "normal 600 16px Work Sans",
      //   textTransform: "uppercase",
      // },
      // "& $h4": {
      //   paddingRight: "25px",
      // },
      padding: theme.spacing(0, 0.7),

    },
    filterBody: {
      margin: theme.spacing(0, "auto"),
    },

    checkbox: {
      "& .Mui-checked": {
        color: "var(--main-opacity)",
      },
      fontSize: "12px",
      textTransform: "capitalize",
    },
    appliedFilterContainer: {
      border: "1px solid var(--border-color)",
      marginBottom: theme.spacing(1.5)
    },
    selectedFilter: {
      padding: theme.spacing(1),

    },
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(1),
      '& .MuiTypography-body1': {
        fontWeight: 600,

      },
      '& .MuiTypography-body2': {
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        '& a': {
          textDecoration: "none"
        }

      }
    },
    text: {
      font: "normal 14px Work Sans SemiBold",
      letterSpacing: "1px",
      lineHeight: 1.5
    }


  })
);


const chipStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0, 1, 1, 0),
      overflow: "none",
      borderRadius: 2,
      backgroundColor: "var(--white)",
      border: "1px solid var(--border-color)",
      '& .MuiChip-label': {
        font: "normal 10px Work Sans",
        color: "var(--secondary-black)",
        lineHeight: "12px",
        textTransform: "capitalize",
        paddingLeft: "10px",
        paddingRight: "10px"
      },
      '& .MuiChip-deleteIcon': {
        height: 14,
        width: 14
      }
    }
  })
)

const StyledChip = (props: any) => {
  const classes = chipStyles();
  return (
    <Chip
      deleteIcon={<span><img src={Utils.images.FILTER_CROSS} alt="cross" /></span>}
      className={classes.chip}
      {...props}
    />
  )
}
interface Props {
  obj: any;
  setParams: Function;
}

const Filters: React.FC<any> = (props: Props) => {
  const history = useHistory();
  const filters = useSelector((state: ReducersModal) => state.productFilterReducer?.filters)
  // const [filterData, setFilterData] = useState(props?.data?.filters || {});
  // let filters: any[] = getFiltersData(filterData);
  const mobileAppliedFilters: any =
    useSelector((state: ReducersModal) => state.productFilterReducer.mobileAppliedFilters || {})

  const fromRoutePath = useSelector(
    (state: ReducersModal) => state.homeReducer.fromPath
  );
  const [params, setParams] = useState<any>({
    customAttributes: mobileAppliedFilters?.customAttributes?.length ? mobileAppliedFilters?.customAttributes : [],
    otherFilters: mobileAppliedFilters?.otherFilters?.length ? mobileAppliedFilters?.otherFilters : [],
  });


  const [selectedFilters, setSelectedFilters] = useState<any>(mobileAppliedFilters?.selectedFilters || []);
  const query = Utils.CommonFunctions.useQuery();
  let filter = query?.get("filters") ?? ""

  // useEffect(() => {
  //   if (filter) {
  //     let appliedFilter = JSON.parse(decodeURIComponent(decodeURIComponent(filter)))
  //     let queryFilter: any = [];
  //     filters.otherFilters.map((item: any) => {
  //       return appliedFilter.otherFilters.some((value: any) => {
  //         item.options.map((a: any) => {
  //           if (value.options.some((b: any) => a._id === b._id))
  //             queryFilter.push({ ...a, type: "otherFilters", filter: { _id: value._id } })
  //         })
  //       }
  //       )
  //     })
  //     filters.customAttributes.map((item: any) => {

  //       return appliedFilter.customAttributes.some((value: any) => {
  //         item.options.map((a: any) => {
  //           if (value.options.some((b: any) => a.name == b._id))
  //             queryFilter.push({ ...a, type: "customAttributes", filter: { _id: value._id } })
  //         })
  //       }
  //       )
  //     })
  //     setSelectedFilters(queryFilter)
  //     const data = { ...props.obj, ...appliedFilter };

  //     dispatch(getProductList(data, false, () => {
  //       dispatch(hideLoader())
  //     }));
  //   }
  // }, [])

  useEffect(() => {
    if (fromRoutePath !== "pdp") {
      setSelectedFilters([])
      setParams({
        customAttributes: [],
        otherFilters: [],
      })
      if (filter) {
        let appliedFilter = JSON.parse(decodeURIComponent(decodeURIComponent(filter)))
        let queryFilter: any = [];
        filters.otherFilters.map((item: any) => {
          return appliedFilter.otherFilters.some((value: any) => {
            item.options.map((a: any) => {
              if (value.options.some((b: any) => a._id === b._id))
                queryFilter.push({ ...a, type: "otherFilters", filter: { _id: value._id } })
            })
          }
          )
        })
        filters.customAttributes.map((item: any) => {

          return appliedFilter.customAttributes.some((value: any) => {
            item.options.map((a: any) => {
              if (value.options.some((b: any) => a.name == b._id))
                queryFilter.push({ ...a, type: "customAttributes", filter: { _id: value._id } })
            })
          }
          )
        })
        setSelectedFilters(queryFilter)
        const data = { ...props.obj, ...appliedFilter };

        setParams(appliedFilter)

        dispatch(getProductList(data, false, () => {
          dispatch(hideLoader())
        }));
      }
    } else {
      setSelectedFilters(mobileAppliedFilters?.selectedFilters || [])
    }

  }, [props.obj.query, props.obj.categoryId])

  const dispatch = useDispatch();
  // const productData: any = useSelector(
  //   (state: ReducersModal) => state.productReducer
  // );keyword
  const classes = useStyles();

  const clearAllFilter = () => {
    setSelectedFilters([]);
    dispatch({ type: 'mobile-applied-filters', payload: { ...mobileAppliedFilters, selectedFilters: [], page: 1 } })
    setParams({
      customAttributes: [],
      otherFilters: [],
    })
    const data = { ...props.obj, page: 1 };
    props.setParams(data)
    dispatch(showLoader());
    delete data.selectedFilters
    dispatch(getProductList(data, false, () => {
      dispatch(hideLoader())
    }));
    history.push({ pathname: history.location.pathname })
  }
  // useEffect(() => {
  //   dispatch({ type: 'mobile-applied-filters', payload: { ...mobileAppliedFilters, selectedFilters, page: 1 } })

  // }, [selectedFilters, selectedFilters.length])

  const onCheckboxChange = (
    e: any,
    type: string,
    filter: any,
    option: any,
  ) => {
    dispatch(showLoader())
    let appliedFilter = params;
    let checked = e.target.checked ?? false;
    let filterExist = appliedFilter[type].find((val: any) => val._id === filter._id)
    debugger
    if (filterExist) {

      if (checked) {

        filterExist.options.push({ _id: type === "otherFilters" ? option._id : option.name })
        setSelectedFilters((prev: any) => [
          ...prev,
          { ...option, type, filter }
        ])
        dispatch({
          type: 'mobile-applied-filters', payload: {
            ...mobileAppliedFilters, ...appliedFilter,
            selectedFilters: mobileAppliedFilters?.selectedFilters.length ? [...mobileAppliedFilters.selectedFilters, { ...option, type, filter }] : [{ ...option, type, filter }], page: 1
          }
        })

      } else {

        let selectedFilterIndex = selectedFilters.findIndex((val: any) => val.name === option.name)
        selectedFilters.splice(selectedFilterIndex, 1);
        dispatch({
          type: 'mobile-applied-filters', payload: {
            ...mobileAppliedFilters, ...appliedFilter,
            selectedFilters, page: 1
          }
        })
        if (filterExist.options.length > 1) {
          let index = filterExist.options.findIndex((val: any) => val._id === (type === "otherFilters" ? option._id : option.name))
          filterExist.options.splice(index, 1)
        } else {
          let index = appliedFilter[type].findIndex((val: any) => val._id === filterExist._id)
          appliedFilter[type].splice(index, 1)
        }
      }

    } else {
      appliedFilter[type].push({ ...filter, options: [{ _id: type === "otherFilters" ? option._id : option.name }] })
      setSelectedFilters((prev: any) => [
        ...prev,
        { ...option, type, filter }
      ]);
      dispatch({
        type: 'mobile-applied-filters', payload: {
          ...mobileAppliedFilters, ...appliedFilter,
          selectedFilters: mobileAppliedFilters?.selectedFilters.length ? [...mobileAppliedFilters?.selectedFilters,
          { ...option, type, filter }] : [{ ...option, type, filter }], page: 1
        }
      })

    }
    history.push({ pathname: history.location.pathname, search: `?filters=${encodeURI(encodeURIComponent(JSON.stringify(appliedFilter)))}` })
    setParams(appliedFilter)
    const data = { ...props.obj, ...appliedFilter, page: 1 };
    props.setParams(data);
    delete data.selectedFilters
    dispatch(getProductList(data, false, () => {
      dispatch(hideLoader())
    }));
  };
  // let Navigator: any = navigator
  // let selectedFilters = params.otherFilters.concat(params.customAttributes);

  return (
    <div className={classes.filterContainer}>
      <div className={classes.filterContainer}>
        {selectedFilters.length ?
          <div className={classes.appliedFilterContainer}>
            <div className={classes.titleContainer}>
              <Typography variant="body1" className={classes.text}>FILTERS APPLIED</Typography>
              <Typography align="right" variant="body2" color="primary" ><Link onClick={() => clearAllFilter()}>Clear All</Link></Typography>
            </div>
            <Divider />
            <div className={classes.selectedFilter}>
              {selectedFilters.map((val: any, i: any) => (
                <StyledChip
                  key={i}
                  variant="outlined"
                  label={val.name}
                  onDelete={(e: any) => onCheckboxChange(e, val.type, val.filter, val)}
                />
              ))}

            </div>
          </div> :
          filters ? <Divider style={{ marginBottom: 20 }} /> : null
        }
        {filters?.otherFilters &&
          filters?.otherFilters?.map((value: any, i: any) => {
            // let check = false
            // if (value.type && params[value.type]?.length > 0 && value.type !== "customAttributes") {
            //   check = true

            // } else {
            //  const result= params[value.type].filter((item: any) => 
            //     value._id === item._id && item.options.length > 0
            //   )
            //   check=result.length>0

            // }
            return (
              <div
                className={classes.filterBody}
                // key={value._id + value.name}
                key={i}
              >
                <FilterContent
                  onCheckboxChange={onCheckboxChange}
                  filter={value}
                  obj={props.obj}
                  openToggle={i === 0 && !Utils.CommonFunctions.mobileCheck() ? false : true}
                  type="otherFilters"
                  appliedFilter={selectedFilters}

                />
              </div>
            )
          })
        }
        {
          filters?.customAttributes &&
          filters?.customAttributes?.map((value: any, i: any) => {
            // let check = false
            // if (value.type && params[value.type]?.length > 0 && value.type !== "customAttributes") {
            //   check = true

            // } else {
            //  const result= params[value.type].filter((item: any) => 
            //     value._id === item._id && item.options.length > 0
            //   )
            //   check=result.length>0

            // }
            return (
              <div key={i}>
                {value.name &&
                  <div
                    className={classes.filterBody}
                  // key={value._id + value.name}

                  >
                    <FilterContent
                      onCheckboxChange={onCheckboxChange}
                      filter={value}
                      obj={props.obj}
                      // index={i}
                      type="customAttributes"
                      // appliedFilter={params}
                      appliedFilter={selectedFilters}

                    />
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Filters;
