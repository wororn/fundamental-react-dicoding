import React from "react";
import { useNavigate } from "react-router-dom";
import MemoForm from "../components/memo/MemoForm";
import { addNote } from "../utils/network-data";

const AddMemo = () => {
  const navigate = useNavigate();

  const handleAddNote = (notes) => {
    addNote(notes);
    navigate("/");
  };
  return (
    <section className="memo-list-input__app">
      <article className="memo-list-article__app">
        <MemoForm addMemo={handleAddNote} />
      </article>
    </section>
  );
};
export default AddMemo;
