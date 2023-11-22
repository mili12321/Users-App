import "./UsersTable.scss";
import { User } from "../../../../../data/types";
import { useState, useEffect, useCallback } from "react";
import { Table } from "./components/Table/Table";

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  url: string;
};

export const UsersTable = ({ users, isLoading, url }: UsersTableProps) => {
  const [sortedUsers, setSortedUsers] = useState<User[]>(users);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  useEffect(() => {
    setSortConfig({ key: null, direction: "asc" });
  }, [url]);

  const sortTable = useCallback(
    (key: string) => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });

      const sortedData = [...sortedUsers].sort((a, b) => {
        const getValue = (user: User, property: string): string | number => {
          const value = property
            .split(".")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .reduce((obj, prop) => (obj as any)?.[prop], user);

          if (typeof value === "string" || typeof value === "number") {
            return value;
          }

          return ""; // Return an empty string if the value is not a string or number
        };

        const aValue = getValue(a, key);
        const bValue = getValue(b, key);

        if (direction === "asc") {
          if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue);
          } else {
            return (aValue as number) - (bValue as number);
          }
        } else {
          if (typeof aValue === "string" && typeof bValue === "string") {
            return bValue.localeCompare(aValue);
          } else {
            return (bValue as number) - (aValue as number);
          }
        }
      });

      setSortedUsers(sortedData);
    },
    [sortConfig.direction, sortConfig.key, sortedUsers]
  );

  if (!sortedUsers && !isLoading) return <div>No Data Available</div>;
  if (sortedUsers && sortedUsers.length === 0) <div>No Users</div>;
  return (
    <div className="table-container">
      <Table
        users={sortedUsers}
        isLoading={isLoading}
        sortTable={sortTable}
        sortConfig={sortConfig}
      />
    </div>
  );
};
