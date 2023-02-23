import React, { useState } from "react";
import QueryContext from "./queryContext";

const QueryState = (props) => {

    const [query, setQuery] = useState('');

return (
        <QueryContext.Provider value={{query, setQuery}}>
            {props.children}
        </QueryContext.Provider>
    );
}

export default QueryState;