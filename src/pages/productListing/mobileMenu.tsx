import { Tabs, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Utils from '../../utils';
import { useLocation } from 'react-router-dom';
import { ReducersModal } from '../../models';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuTab: {
            position: "sticky",
            top: 56,
            zIndex: 1100,
            backgroundColor: "#ffffff",
            '& .MuiTab-root': {
                color: "#000000",
                font: "normal 700 16px Work Sans Bold",
                textTransform: "capitalize",
                '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    font: "normal 16px Work Sans Bold"
                }
            },
            '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
                height: "2.47px",
            }

        }
    })
);

const MobileMenu = () => {
    const history = useHistory();
    const classes = useStyles();
    const location: any = useLocation();
    const params: any = useParams()
    const menuData = useSelector(
        (state: ReducersModal) => state.homeReducer.menuData
    );
    let categoryId = location?.state?.categoryId ?? params?.id ?? "";
    const [value, setValue] = useState(categoryId ? +categoryId : 0);
    // useEffect(() => {
    //     getPLPCategories().then((resp) => {
    //         setMenus(resp.data.data.data);

    //     }).catch((err) => {

    //     })
    // }, []);

    // const [menus, setMenus] = useState([])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handelClick = (e: any, item: any) => {
        // let path = item.customAttributes.find((item: any) => item.attribute_code === "url_path")?.value
        // let googleCode = item.customAttributes.find((item: any) => item.attribute_code === "google_category")?.value
        // let pathname = `/${path}/c/${googleCode}`
        let pathname = Utils.CommonFunctions.seoUrl(item, "others")
        history.push({ pathname })
    }


    // const query = Utils.CommonFunctions.useQuery();
    // let categoryId = query.get("categoryId") ?? "";

    useEffect(() => {
        if (categoryId) {
            setValue(+categoryId)
        }
    }, [categoryId])


    return (
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className={classes.menuTab}
        >
            {menuData.map((item: any, key: any) => (
                <Tab value={item?.id ? +item.id : 0} label={item.title} key={key} onClick={(_) => handelClick(_, item)} />
            ))}
        </Tabs>
    )
}

export default MobileMenu