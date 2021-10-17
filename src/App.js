import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const getLocalList = () => {
    const localList = localStorage.getItem("list");
    if (localList) {
      return JSON.parse(localList);
    }
    return [];
  };
  const [isAlert, setIsAlert] = useState({ show: false, type: "", msg: "" });
  const [item, setItem] = useState({ id: "", name: "" });
  const [list, setList] = useState(getLocalList());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const showAlert = (show = false, type = "", msg = "") => {
    setIsAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) {
      showAlert(true, "danger", "Please type the grocessary name");
    } else if (item && isEditing) {
      setList(
        list.map((stuff) => {
          if (stuff.id === editId) {
            return { id: editId, item: item.name };
          }
          console.log(stuff);
          return stuff;
        })
      );
      setEditId(null);
      setIsEditing(false);
      setItem({ id: "", name: "" });
      showAlert(true, "success", "Item value Updated");
    } else {
      showAlert(true, "success", "New item added");
      const newList = { id: new Date().getTime().toString(), item: item.name };
      setList([...list, newList]);
      setItem({ id: "", name: "" });
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsEditing(true);
    const selectedItem = list.find((item) => item.id === id);
    setItem({ id: id, name: selectedItem.item });
  };
  const handleDelete = (itemId) => {
    console.log("To be updated....");
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
  };

  const removeActive = () => {
    showAlert(false);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <Alert
        type={isAlert.type}
        msg={isAlert.msg}
        removeActive={removeActive}
      />
      <section className="grocery-form">
        <h3>Grocery Buds</h3>
        <form
          action="#"
          className="form-control"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="grocery"
            type="text"
            name="grocery"
            id="grocery"
            placeholder="e.g: Bread"
            value={item.name}
            onChange={(e) =>
              setItem({
                id: new Date().getTime().toString,
                name: e.target.value,
              })
            }
          />
          <button className="submit-btn">Add</button>
        </form>
      </section>
      <section className="grocery-container">
        {list.length ? (
          <>
            <List
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              list={list}
            />
            <button className="clear-btn" onClick={() => setList([])}>
              Clear all
            </button>
          </>
        ) : (
          <div className="grocery-item">No items yet</div>
        )}
      </section>
    </section>
  );
}

export default App;
