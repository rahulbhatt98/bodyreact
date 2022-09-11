export const saveLocationHistory = (data: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: "saveLocationHistory",
      payload: data,
    });
  };
};