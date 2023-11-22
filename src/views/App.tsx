import { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { UserView } from "./components/UserView/UserView";
import { CacheProvider } from "../data/cacheContext";

const EXCLUDE_FIELDS = "login%2Cregistered%2Ccell";
const SEED = "123";
const USERS_PER_PAGE = 10;
const BASE_API_URL = "https://randomuser.me/api/";

const URL = `${BASE_API_URL}?exc=${EXCLUDE_FIELDS}&seed=${SEED}&results=${USERS_PER_PAGE}&page=1`;

export function App() {
  const [url, setUrl] = useState(URL);

  return (
    <>
      <CacheProvider>
        <Navbar setUrl={setUrl} url={url} />
        <UserView url={url} setUrl={setUrl} usersPerPage={USERS_PER_PAGE} />
      </CacheProvider>
    </>
  );
}
