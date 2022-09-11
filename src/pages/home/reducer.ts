import { LoadingModal, HomeModal, ConfigModal } from "../../models";
import Utils from "../../utils";

/**
 * Global Loading reducer
 */
export const loadingReducer = (
  state: LoadingModal = new LoadingModal(),
  action: any
) => {
  switch (action.type) {
    case Utils.ActionName.LOADING:
      return { ...state, ...action.payload };
    case Utils.ActionName.SKELETON_LOADING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


/**
 * Global Loading reducer
 */
// export const homeReducer = (
//   state: HomeModal = new HomeModal(),
//   action: any
// ) => {
//   switch (action.type) {
//     case Utils.ActionName.HOME_PAGE_DATA:
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };


export const homeReducer = (state = new HomeModal(), action: any) => {
  switch (action.type) {
    case "getHomeData":
      return { ...state, homeData: [...action.payload] };
    case Utils.ActionName.MENU_DATA:
      return { ...state, ...action.payload };
    case "getMobileHomeData":
      return { ...state, mobileHomeData: [...action.payload] };
    case Utils.ActionName.FOOTER_MENU:
      return { ...state, ...action.payload };
    case Utils.ActionName.MOBILE_MENUS_DATA:
      return { ...state, mobileMenusData: [...action?.payload?.menuData] };
    case Utils.ActionName.FROM_PATH:
      return { ...state, fromPath: action?.payload?.fromPath };
    case Utils.ActionName.AUTH_TOKEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const configReducer = (state = new ConfigModal(), action: any) => {
  switch (action.type) {
    case "setConfig":
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}