import React from "react";

// containers
import Calendar from "containers/Calendar";

// store
import useDataActions from "store/data/actions";

// etc
import GlobalStyle from "./GlobalStyle";

const App = () => {
  useDataActions();

  return (
    <>
      <GlobalStyle />
      <Calendar />
    </>
  );
};

export default App;
