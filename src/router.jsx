import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { siteBase, sitePath } from "./site-path.js";

const RouterContext = createContext(null);

function readLocation() {
  let pathname = window.location.pathname;
  if (siteBase && (pathname === siteBase || pathname.startsWith(siteBase + "/"))) {
    pathname = pathname.slice(siteBase.length);
  }
  return {
    path: pathname.replace(/\/+$/, "") || "/",
    search: window.location.search,
  };
}

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const sync = () => setLocation(readLocation());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = useCallback((to, options = {}) => {
    const url = new URL(to, window.location.origin);
    if (siteBase && url.origin === window.location.origin
      && url.pathname !== siteBase && !url.pathname.startsWith(siteBase + "/")) {
      url.pathname = sitePath(url.pathname);
    }
    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      setLocation(readLocation());
      return;
    }
    const state = options.state ?? {};
    if (options.replace) window.history.replaceState(state, "", url);
    else window.history.pushState(state, "", url);
    setLocation(readLocation());
  }, []);

  const value = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return {
      path: location.path,
      search: location.search,
      query,
      get: (key) => query.get(key),
      navigate,
    };
  }, [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used inside RouterProvider");
  return context;
}
