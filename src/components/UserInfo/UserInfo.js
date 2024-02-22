import "./UserInfo.scss";
import profileIcon from "../../assets/icons/profile-icon.svg";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function UserInfo() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");

        if (!authToken) {
          console.error("User not authenticated");
          return;
        }

        const response = await axios.get(`${SERVER_URL}/user`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log(response.data);
        setUsername(response.data);
      } catch (error) {
        console.error(
          "Could not get username: ",
          error.response || error.message
        );
      }
    };
    getUsername();
  }, []);

  return (
    <section className="user">
      <div className="user__image">
        <img className="user__icon" src={profileIcon}></img>
      </div>
      <h1 className="user__greeting">Hello, {username.username}!</h1>
    </section>
  );
}

export default UserInfo;
