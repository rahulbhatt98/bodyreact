import React, { Suspense, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PageContainer from "../components/pageContainer/publicContainer";
import Utils from "../utils";
import NoInternet from "../pages/error/noInternet";
import { Skeleton } from "@mui/material";
import { isAuthenticated } from "../utils/session";
import { ReducersModal } from "../models";
import { useSelector } from "react-redux";

interface Props {
  path: string | Array<string>;
  component: any;
  exact: boolean;
  authentication?: boolean;
}

const SuspenseComponent = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={"99%"} height={300} style={{ margin: 10 }} />
      <Skeleton variant="rectangular" width={"99%"} height={300} style={{ margin: 10 }} />
    </div>
  )
}

const PublicRoute = ({ component: Component, ...rest }: Props) => {
  const history = useHistory()
  const [token, setToken] = useState<any>(undefined)

  const { authToken } = useSelector((state: ReducersModal) => state.homeReducer)

  const query = Utils.CommonFunctions.useQuery();
  let redirectTo = query.get("redirectTo") ?? "/";

  useEffect(() => {
    if (authToken) {
      setToken(authToken)
    }
  }, [authToken])

  useEffect(() => {
    if (isAuthenticated() && rest.authentication) {
      history.push(redirectTo)
    }
  }, [])

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) => (
          <>
            {
              navigator.onLine ?
                <Suspense fallback={<SuspenseComponent />}>
                  <PageContainer {...props}>
                    {
                      token && <Component {...props} />
                    }
                  </PageContainer>
                </Suspense>
                :
                <NoInternet />
            }
          </>
        )}
      />
    </React.Fragment>
  );
};


export default PublicRoute;