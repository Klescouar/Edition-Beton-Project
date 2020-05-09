import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "@reach/router";

import { getCategories as loadCategories } from "../../../actions/categories";
import { getCategories } from "../../../selectors/categories";
import { addCategory, removeCategory } from "../../../actions/categories";
import MaterialButton from "../../MaterialButton/MaterialButton";
import MaterialInput from "../../MaterialInput/MaterialInput";
import RemoveButton from "../../RemoveButton/RemoveButton";

import "./HandleCategories.scss";
import { useFetchData } from "../../useFetchData";
import { Category } from "../../../types/categories";

const HandleCategories = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");

  const categories = useFetchData<Category[]>(loadCategories, getCategories);

  const handleClick = () => {
    dispatch(addCategory(category));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategory(value);
  };

  return (
    <div className="HandleCategories">
      <div className="HandleCategories__List">
        {categories.map((category) => (
          <div key={category._id} className="HandleCategories__List__Item">
            <RemoveButton
              handleClick={() => dispatch(removeCategory(category._id))}
            />
            <p className="HandleCategories__List__Item__Text">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <div className="HandleCategories__Form">
        <MaterialInput
          name="name"
          handleChange={handleChange}
          label="Nom de la catégorie"
          value={category}
        />
        <MaterialButton text="Ajouter" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default HandleCategories;
