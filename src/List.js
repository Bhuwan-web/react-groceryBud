import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ handleDelete, handleEdit, list }) => {
  return (
    <>
      {list.map(({ id, item }) => (
        <div className="grocery-item" key={id}>
          <div>{item}</div>
          <div>
            <span className="edit-btn" onClick={() => handleEdit(id)}>
              <FaEdit />
            </span>
            <span className="delete-btn" onClick={() => handleDelete(id)}>
              <FaTrash />
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default List;
