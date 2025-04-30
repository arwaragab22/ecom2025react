import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Oops!</h1>

      {isRouteErrorResponse(error) ? (
        <>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </>
      ) : (
        <>
          <h2>Unexpected Error</h2>
          <p>Something went wrong. Please try again later.</p>
        </>
      )}
    </div>
  );
}
