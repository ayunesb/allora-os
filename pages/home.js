import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "@/routes/index";
const App = () => {
    return (_jsx(Router, { children: _jsx(Switch, { children: _jsx(Route, { exact: true, path: "/", component: HomePage }) }) }));
};
export default App;
