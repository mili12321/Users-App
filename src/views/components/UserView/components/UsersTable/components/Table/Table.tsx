import { useModal } from "../../../../../../../data/hooks/useModal";
import { User } from "../../../../../../../data/types";
import { Modal } from "../../../../../Modal/Modal";
import { Skeleton } from "../../../../../Skeleton/Skeleton";
import { UserDetails } from "../../../UserDetails/UserDetails";
import { formatDate, getPropertyValue } from "../../utils";
import "./Table.scss";

type TableProps = {
  users: User[];
  isLoading: boolean;
  sortTable: (key: string) => void;
  sortConfig: SortConfig;
};

type SortConfig = {
  key: string | null;
  direction: "asc" | "desc";
};
type SortingArrowsProps = {
  sortConfig: SortConfig;
  sortKey: string;
  onClick: () => void;
};

const sortableColumns = ["Full Name", "City"];

const columnConfig = [
  {
    property: "picture.large",
    displayName: "Picture",
    className: "picture",
    render: (user: User) => <img src={user.picture.large} alt="User" />,
  },
  {
    property: ["name.first", "name.last"],
    displayName: "Full Name",
    className: "name",
    render: (user: User) => `${user.name.first} ${user.name.last}`,
  },
  { property: "email", displayName: "Email", className: "email" },
  { property: "phone", displayName: "Phone #", className: "phone" },
  { property: "gender", displayName: "Gender", className: "gender" },
  { property: "location.city", displayName: "City", className: "city" },
  {
    property: "dob.date",
    displayName: "Date of Birth",
    className: "dob",
    render: (user: User) => formatDate(user.dob.date),
  },
  { property: "nat", displayName: "Nationality", className: "nationality" },
];

export const Table = ({
  users,
  isLoading,
  sortTable,
  sortConfig,
}: TableProps) => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();

  return (
    <>
      <table className="users-table">
        <thead>
          <tr>
            {columnConfig.map((column, index) => (
              <th key={index} className={`${column.className}`}>
                <div className="title-container">
                  <span>{column.displayName}</span>
                  {sortableColumns.includes(column.displayName) && (
                    <SortingArrows
                      onClick={() =>
                        sortTable(
                          column.displayName === "Full Name"
                            ? "name.first"
                            : "location.city"
                        )
                      }
                      sortConfig={sortConfig}
                      sortKey={
                        column.displayName === "Full Name"
                          ? "name.first"
                          : "location.city"
                      }
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columnConfig.map((column, colIndex) => (
                    <td key={colIndex} className={`${column.className}`}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            : users.map((user) => (
                <tr
                  key={`${user.name.first}-${user.name.last}`}
                  onClick={() => openModal(<UserDetails user={user} />)}
                >
                  {columnConfig.map((column, colIndex) => (
                    <td key={colIndex} className={`${column.className}`}>
                      {column.render
                        ? column.render(user)
                        : getPropertyValue(user, column.property)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

const SortingArrows = ({
  onClick,
  sortConfig,
  sortKey,
}: SortingArrowsProps) => {
  return (
    <span className="sorting-arrows" onClick={onClick}>
      <div
        className={`${
          sortConfig.key === sortKey && sortConfig.direction === "asc"
            ? "active"
            : ""
        }`}
      >
        &#11165;
      </div>
      <div
        className={`${
          sortConfig.key === sortKey && sortConfig.direction === "desc"
            ? "active"
            : ""
        }`}
      >
        &#11167;
      </div>
    </span>
  );
};
