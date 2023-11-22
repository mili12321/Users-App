import { useCallback, useState } from "react";
import "./UserView.scss";
import { UsersTable } from "./components/UsersTable/UsersTable";
import { useFetch } from "../../../data/hooks/useFetch";
import { Pagination } from "./components/Pagination/Pagination";

type Props = {
  url: string;
  setUrl: (url: string) => void;
  usersPerPage: number;
};

const TOTAL_USERS = 10000;

export const UserView = ({ url, setUrl, usersPerPage }: Props) => {
  const { response, isLoading, error } = useFetch(url);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);

      setUrl((prevUrl: string) => {
        const apiUrl = new URL(prevUrl);
        if (apiUrl.searchParams.has("page")) {
          apiUrl.searchParams.set("page", page.toString());
        } else {
          apiUrl.searchParams.append("page", page.toString());
        }
        const newUrl: string = apiUrl.toString();

        return newUrl;
      });
    },
    [setUrl]
  );

  if (error) return <div>Error occurred: {error.message}</div>;
  return (
    <section className="user-view">
      <UsersTable users={response?.results} isLoading={isLoading} url={url} />

      <Pagination
        currentPage={currentPage}
        totalCount={TOTAL_USERS}
        pageSize={usersPerPage}
        onPageChange={(page: number) => handlePageChange(page)}
      />
    </section>
  );
};
