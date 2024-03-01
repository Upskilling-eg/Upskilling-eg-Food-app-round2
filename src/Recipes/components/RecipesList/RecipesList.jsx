import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);

  const [recipeId, setRecipeId] = useState(0);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  };

  const navigateToRecipeData = () => {
    navigate("/dashboard/recipe-data");
  };

  const getList = async (pageNo, pageSize, name, tagId, catId) => {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        {
          headers: { Authorization: token },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        }
      );
      setPagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(response.data.totalNumberOfPages);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoriesList = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategoriesList(categoriesList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagsList = async () => {
    try {
      let tagsList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTagsList(tagsList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReceipe = async () => {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`,
        { headers: { Authorization: token } }
      );
      getList();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = async (recipeId) => {
    let token = localStorage.getItem("token");
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:443/api/v1/userRecipe`,
        { recipeId: recipeId },
        { headers: { Authorization: token } }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    setNameSearch(input.target.value);
    getList(1, 10, input.target.value, selectedTagId, selectedCatId);
  };

  const getCatValue = (select) => {
    setSelectedCatId(select.target.value);
    getList(1, 10, nameSearch, selectedTagId, select.target.value);
  };

  const getTagValue = (select) => {
    setSelectedTagId(select.target.value);
    getList(1, 10, nameSearch, select.target.value, selectedCatId);
  };

  useEffect(() => {
    getList(1, 5);
    getCategoriesList();
    getTagsList();
  }, []);

  return (
    <>
      <Header
        title="Recipes List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} alt="" />
            <h5 className="my-2">Delete This Item ?</h5>
            <span className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </span>
            <div className="text-end my-3">
              <button
                onClick={deleteReceipe}
                className="btn btn-outline-danger"
              >
                Delete this item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="title-info d-flex justify-content-between p-4">
        <div className="title ">
          <h5>Recipes Table Details</h5>
          <h6>You can check all details</h6>
        </div>
        <div className="btn-container">
          <button onClick={navigateToRecipeData} className="btn btn-success ">
            Add new Recipe
          </button>
        </div>
      </div>
      <div className="row p-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="search by name"
            onChange={getNameValue}
          />
        </div>
        <div className="col-md-3">
          <select className="form-control" onChange={getCatValue}>
            <option value="">search by category</option>
            {categoriesList?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control" onChange={getTagValue}>
            <option value="">search by tag</option>
            {tagsList?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-4 my-3 table-responsive text-center">
        {recipesList.length > 0 ? (
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        className="w-25"
                        src={`https://upskilling-egypt.com/${recipe.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <img className="w-25 h-25" src={noData} alt="" />
                    )}
                  </td>
                  <td>{recipe.category[0]?.name}</td>
                  <td>
                    {loginData?.userGroup == "SuperAdmin" ? (
                      <>
                        <i
                          className="fa fa-edit text-warning mx-2"
                          aria-hidden="true"
                        ></i>
                        <i
                          onClick={() => handleShow(recipe.id)}
                          className="fa fa-trash text-danger mx-2"
                          aria-hidden="true"
                        ></i>
                      </>
                    ) : (
                      <i
                        onClick={() => addToFav(recipe.id)}
                        className="fa fa-heart text-danger mx-2"
                        aria-hidden="true"
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pagesArray.map((pageNo) => (
                  <li
                    key={pageNo}
                    className="page-item"
                    onClick={() => getList(pageNo, 5)}
                  >
                    <a className="page-link">{pageNo}</a>
                  </li>
                ))}

                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </table>
        ) : (
          <img src={noData} alt="" />
        )}
      </div>
    </>
  );
}
