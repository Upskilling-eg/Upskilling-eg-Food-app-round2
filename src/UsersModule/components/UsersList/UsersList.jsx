import axios from "axios";
import React, { useEffect, useState } from "react";
import noData from "../../../assets/images/no-data.png";
import Header from "../../../SharedModule/components/Header/Header";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);

  const getList = async () => {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1/",
        { headers: { Authorization: token } }
      );
      console.log(response.data.data);
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header
        title="Users List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div className="px-4 my-3 table-responsive text-center">
        {usersList.length > 0 ? (
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Image</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.imagePath ? (
                      <img
                        className="w-25"
                        src={`https://upskilling-egypt.com/${user.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <img className="w-25 h-25" src={noData} alt="" />
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <img src={noData} alt="" />
        )}
      </div>
    </>
  );
}
