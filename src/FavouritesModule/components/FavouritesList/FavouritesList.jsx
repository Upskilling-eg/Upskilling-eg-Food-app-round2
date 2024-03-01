import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";

export default function FavouritesList() {
  const [favList, setFavList] = useState([]);

  const getList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setFavList(response.data.data);
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
        title="Favourites items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
{/* mohamed */}
      <div className="row p-4">
        {favList?.length > 0 ? (
          favList.map((fav) => (
            <div className="col-md-4">
              <div className="item ">
                <img
                  className="img-fluid"
                  src={`https://upskilling-egypt.com/${fav.recipe.imagePath}`}
                  alt=""
                />
                <h3>{fav.recipe?.name}</h3>
                <p>{fav.recipe?.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-md-4">
            <img src={noData} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
