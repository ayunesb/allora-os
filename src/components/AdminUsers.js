import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Fetch users from API or other source
        const fetchedUsers = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
        ];
        setUsers(fetchedUsers);
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Admin Users" }), users.map((user, index) => (_jsx("div", { children: user.name }, user.id)))] }));
};
export default AdminUsers;
