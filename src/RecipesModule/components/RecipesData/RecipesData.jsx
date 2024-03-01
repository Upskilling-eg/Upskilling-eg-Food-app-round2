import React, { useEffect, useState } from "react";
import RecipesHeader from "../../../SharedModule/components/RecipesHeader/RecipesHeader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function RecipesData() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  const onSubmitAdd = async (data) => {
    let recipeDataForm = appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Recipe",
        recipeDataForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
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

  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);

  return (
    <>
      <ToastContainer />

      <RecipesHeader />
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmitAdd)}>
          <div className="flex-column my-2">
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipe name"
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

          <div className="flex-column my-2">
            <div className="input-group mb-1">
              <input
                type="number"
                className="form-control"
                placeholder="Enter recipe price"
                {...register("price", {
                  required: "Price is required",
                })}
              />
            </div>
            {errors.price && (
              <p className="m-0 alert alert-danger p-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="flex-column my-2">
            <div className="input-group mb-1">
              <select
                className="form-control"
                {...register("categoriesIds", {
                  required: "categories is required",
                })}
              >
                {categoriesList?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoriesIds && (
              <p className="m-0 alert alert-danger p-1">
                {errors.categoriesIds.message}
              </p>
            )}
          </div>

          <div className="flex-column my-2">
            <div className="input-group mb-1">
              <select
                className="form-control"
                {...register("tagId", {
                  required: "tag is required",
                })}
              >
                {tagsList?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.tagId && (
              <p className="m-0 alert alert-danger p-1">
                {errors.tagId.message}
              </p>
            )}
          </div>

          <div className="flex-column my-2">
            <div className="input-group mb-1">
              <input
                type="file"
                className="form-control"
                {...register("recipeImage", {
                  required: "recipeImage is required",
                })}
              />
            </div>
            {errors.recipeImage && (
              <p className="m-0 alert alert-danger p-1">
                {errors.recipeImage.message}
              </p>
            )}
          </div>

          <div className="flex-column my-2">
            <div className="input-group mb-1">
              <textarea
                className="form-control"
                placeholder="Enter recipe description"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>
            {errors.description && (
              <p className="m-0 alert alert-danger p-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
