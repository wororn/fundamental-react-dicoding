import React, { Component } from "react";
import MemoDetail from "./MemoDetail";
import PropTypes from "prop-types";
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
  getNote
} from "../utils/network-data";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function DetailPageCapsuled() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage navigate={navigate} id={id} />;
}

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      initializing: true
    };

    this.onUnarchiveActionHandler = this.onUnarchieveActionHandler.bind(this);
    this.onArchiveActionHandler = this.onArchiveActionHandler.bind(this);
    this.onDeleteActionHandler = this.onDeleteActionHandler.bind(this);
  }

  async componentDidMount() {
    const notes = await getNote(this.props.id);

    this.setState({
      notes: notes.data,
      initializing: false
    });
    console.log("data-awal", notes);
  }

  onUnarchieveActionHandler = async (id) => {
    if (this.state.notes.archived === true) {
      try {
        await unarchiveNote(id);
        //update state after successfully unarchive note.
        this.setState((prevState) => ({
          notes: {
            ...prevState.notes,
            archived: false
          }
        }));
        this.props.navigate("/"); // Navigate after the state is updated, if it's ok.
        console.log(`Catatan ${id} berhasil dipindahkan dari arsip.`);
      } catch (error) {
        console.error("Error Unarchiving Notes", error);
      }
    } else {
      console.log(`Catatan ${id} bukan arsip`);
    }
  };

  onArchiveActionHandler = async (id) => {
    if (this.state.notes.archived === false) {
      try {
        await archiveNote(id);
        //update state after successfully archive note.
        this.setState((prevState) => ({
          notes: {
            ...prevState.notes,
            archived: true
          }
        }));
        this.props.navigate("/archieves"); // Navigate after the state is updated, if it's ok.
        console.log(`Catatan ${id} berhasil dipindahkan ke arsip.`);
      } catch (error) {
        console.error("Error archiving Notes", error);
      }
    } else {
      console.log(`Catatan ${id} adalah arsip`);
    }
  };

  async onDeleteActionHandler(id) {
    await deleteNote(id);
    this.props.navigate("/");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.notes === "") {
      return (
        <p
          style={{
            fontSize: "14px",
            color: " rgb(248, 108, 14)"
          }}
        >
          Catatan Tidak Ditemukan
        </p>
      );
    }

    if (this.state.notes) {
      console.log(this.state.notes); // Add this line to log notes
      return (
        <>
          <MemoDetail
            onDelete={this.onDeleteActionHandler}
            onUnarchive={this.onUnarchieveActionHandler}
            onArchive={this.onArchiveActionHandler}
            notes={this.state.notes}
          />
        </>
      );
    }
    return <PageNotFound />;
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
};

DetailPage.defaultProps = {
  id: "",
  navigate: () => {}
};
