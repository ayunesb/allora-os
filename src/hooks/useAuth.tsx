
// This file is created to redirect imports to the main AuthContext.tsx file
// It's a common pattern to create hook-named files that re-export hooks from context files

import { useAuth } from "@/context/AuthContext";
export { useAuth };
export default useAuth;
