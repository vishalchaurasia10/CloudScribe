import React, { useState } from "react";
import ModeContext from "./modeContext";

const ModeState = (props) => {

    const [darkMode, setDarkMode] = useState(false);

return (
        <ModeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ModeContext.Provider>
    );
}

export default ModeState;