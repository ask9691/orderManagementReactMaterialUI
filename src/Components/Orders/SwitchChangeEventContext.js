import React from "react";

// set the defaults
const SwitchChangeEventContext = React.createContext({
  onSwitchChangeEvent: () => {}
});

export default SwitchChangeEventContext;