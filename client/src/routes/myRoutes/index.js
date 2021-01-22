import { useQuery } from "@urql/preact";
import { useState } from "preact/hooks";

import style from "./style.css";
import { LargeRouteCard, Spinner } from "../../components";
import { queries } from "../../services/graphqlService";
import { useAuth } from "../../context/AuthContext";

const MyRoutes = () => {
  const { user } = useAuth();

  const [{ data, fetching, error }, _] = useQuery({
    query: queries.userRoutesQuery,
    variables: { _id: user },
  });

  const [shownRoutes, setShownRoutes] = useState("owned_routes");

  const showRoutes = () => {
    return data.user[shownRoutes].map((route) => (
      <LargeRouteCard data={route} key={route._id} />
    ));
  };

  return (
    <>
      <header class={style.header}>
        <nav>
          <button
            onClick={() => setShownRoutes("owned_routes")}
            class={shownRoutes === "owned_routes" ? style.selected : ""}
          >
            OWNED ROUTES
          </button>
          <button
            onClick={() => setShownRoutes("saved_routes")}
            class={shownRoutes === "saved_routes" ? style.selected : ""}
          >
            SAVED ROUTES
          </button>
        </nav>
      </header>
      {fetching ? <Spinner /> : null}
      {error ? <h3>An error ocurred.</h3> : null}
      {data ? (
        <div class={style.routeList}>
          {!fetching && !error ? showRoutes() : null}
        </div>
      ) : null}
    </>
  );
};

export default MyRoutes;
