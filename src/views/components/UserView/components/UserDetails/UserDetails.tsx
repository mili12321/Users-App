import "./UserDetails.scss";
import { User } from "../../../../../data/types";
import { formatDate } from "../UsersTable/utils";

type Props = {
  user: User;
};
export const UserDetails = ({ user }: Props) => {
  const { picture, name, email, phone, gender, location, nat, dob } = user;
  const userPicture = picture.large;
  const fullName = `${name.first} ${name.last}`;
  const city = location.city;
  const dateOfBirth = dob.date;
  return (
    <div className="user-details">
      <section className="left-section">
        <div className="image-wrapper">
          <img src={userPicture} alt="user-picture" />
          <div className="circle"></div>
        </div>
        <div className="left-details">
          <div className="name">{fullName}</div>
          <div className="email">{email}</div>
        </div>
      </section>
      <section className="right-section">
        <div>
          <span className="title">Phone: </span>
          {phone}
        </div>
        <div>
          <span className="title">Gender: </span> {gender}
        </div>
        <div>
          <span className="title">Nationality: </span>
          {nat}
        </div>
        <div>
          <span className="title">City: </span>
          {city}
        </div>
        <div>
          <span className="title">Date of birth: </span>
          {formatDate(dateOfBirth)}
        </div>
      </section>
    </div>
  );
};
