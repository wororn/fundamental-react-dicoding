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

    this.onArchiveActionHandler = this.onArchiveActionHandler.bind(this);
    this.onUnarchiveActionHandler = this.onUnarchieveActionHandler.bind(this);
    this.onDeleteActionHandler = this.onDeleteActionHandler.bind(this);
  }

  async componentDidMount() {
    const notes = await getNote(this.props.id);
    this.setState(() => {
      return {
        notes: notes.data,
        initializing: false
      };
    });
    console.log("data-awal", notes);
  }

  async onDeleteActionHandler(id) {
    await deleteNote(id);
    this.props.navigate("/");
  }

  async onUnarchieveActionHandler(id) {
    if (this.state.notes.unarchiveNote) {
      await unarchiveNote(id);
      this.props.navigate("/archieves");
    }
  }

  async onArchiveActionHandler(id) {
    if (this.state.notes.archiveNote) {
      await archiveNote(id);
      this.props.navigate("/");
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.notes === "") {
      return <p>Catatan Tidak Ditemukan</p>;
    }

    if (this.state.notes) {
      console.log("data-akhir", this.state.notes); // Add this line to log notes
      return (
        <>
          <MemoDetail
            onDelete={this.onDeleteActionHandler}
            onArchive={this.onArchiveActionHandler}
            onUnarchive={this.onUnarchieveActionHandler}
            /* {...notes} */
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
