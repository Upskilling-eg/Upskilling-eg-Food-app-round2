import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Header from "../../../SharedModule/components/Header/Header";
import noData from "../../../assets/images/no-data.png";
import { ToastContainer, toast } from "react-toastify";

export default function CategeriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);
  const [nameSearch, setNameSearch] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setModalState("close");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const showAddModal = () => {
    setValue("name", null);
    setModalState("modal-one");
  };

  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };

  const showUpdateModal = (categoryItem) => {
    setItemId(categoryItem.id);
    setValue("name", categoryItem.name);
    setModalState("modal-three");
  };

  const onSubmitAdd = async (data) => {
    console.log(data);
    let token = localStorage.getItem("token");
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        data,
        { headers: { Authorization: token } }
      );
      getList();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitUpdate = (data) => {
    axios
      .put(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        toast.success("update successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
        getList();
      })
      .catch((error) => console.log(error));
  };
  const deleteCategory = () => {
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        toast.success("delete successsfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleClose();
        getList();
      })
      .catch((error) => console.log(error));
  };
  const getList = async (pageNo, pageSize, name) => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            name: name,
          },
        }
      );
      console.log(categoriesList);
      setPagesArray(
        Array(categoriesList.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(categoriesList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    setNameSearch(input.target.value);
    getList(1, 10, input.target.value);
  };

  useEffect(() => {
    getList(1, 10);
  }, []);

  return (
    <>
      <ToastContainer />

      <Header
        title="Categories items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <Modal show={modalState == "modal-one"} onHide={handleClose}>
        <Modal.Header closeButton>Add Category</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitAdd)}>
            <div className="flex-column my-2">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-list-alt" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="m-0 alert alert-danger p-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-success">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={modalState == "modal-three"} onHide={handleClose}>
        <Modal.Header closeButton>Update Category</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className="flex-column my-2">
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-list-alt" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="m-0 alert alert-danger p-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="form-group d-flex justify-content-end">
              <button className="btn btn-success">Update Category</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={modalState == "modal-two"} onHide={handleClose}>
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
                onClick={deleteCategory}
                className="btn btn-outline-danger"
              >
                Delete this item
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="categories-container">
        <div className="title-info d-flex justify-content-between p-4">
          <div className="title ">
            <h5>Categories Table Details</h5>
            <h6>You can check all details</h6>
          </div>
          <div className="btn-container">
            <button className="btn btn-success " onClick={showAddModal}>
              Add new Category
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
        </div>
        <div className="px-4 table-responsive">
          {categoriesList.length > 0 ? (
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((cat) => (
                  <tr key={cat.id}>
                    <th scope="row">{cat.id}</th>
                    <td>{cat.name}</td>
                    <td>
                      <i
                        onClick={() => showUpdateModal(cat)}
                        className="fa fa-edit text-warning mx-2"
                        aria-hidden="true"
                      ></i>
                      <i
                        onClick={() => showDeleteModal(cat.id)}
                        className="fa fa-trash text-danger"
                        aria-hidden="true"
                      ></i>
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
                      onClick={() => getList(pageNo, 10)}
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
      </div>
    </>
  );
}
