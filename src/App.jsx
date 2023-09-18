import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.getInitialData(),
      archivedNotes: [],
      searchText: "",
      newNoteTitle: "",
      newNoteBody: "",
      maxTitleLength: 50,
    };
  }

  addNewNote = () => {
    const { newNoteTitle, newNoteBody } = this.state;
    const newNote = {
      id: +new Date(),
      title: newNoteTitle,
      body: newNoteBody,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    this.setState({
      notes: [...this.state.notes, newNote],
      newNoteTitle: "",
      newNoteBody: "",
    });
  };

  unarchiveNote = (id) => {
    const { archivedNotes, notes } = this.state;
    const noteToUnarchive = archivedNotes.find((note) => note.id === id);

    if (noteToUnarchive) {
      noteToUnarchive.archived = false;

      this.setState({
        archivedNotes: archivedNotes.filter((note) => note.id !== id),
        notes: [...notes, noteToUnarchive],
      });
    }
  };

  deleteNote = (id) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes: updatedNotes });
  };

  deleteArchivedNote = (id) => {
    const updatedArchivedNotes = this.state.archivedNotes.filter(
      (note) => note.id !== id
    );
    this.setState({ archivedNotes: updatedArchivedNotes });
  };

  toggleArchive = (id) => {
    const { notes, archivedNotes } = this.state;

    const noteToToggle = notes.find((note) => note.id === id);
    if (noteToToggle) {
      noteToToggle.archived = !noteToToggle.archived;

      if (noteToToggle.archived) {
        this.setState({
          notes: notes.filter((note) => note.id !== id),
          archivedNotes: [...archivedNotes, noteToToggle],
        });
      } else {
        this.setState({
          notes: [...notes, noteToToggle],
          archivedNotes: archivedNotes.filter((note) => note.id !== id),
        });
      }
    }
  };

  filterNotes = () => {
    const { notes, searchText } = this.state;
    if (!searchText) {
      return notes;
    }
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  countRemainingCharacters = () => {
    const { newNoteTitle, maxTitleLength } = this.state;
    return maxTitleLength - newNoteTitle.length;
  };

  getInitialData = () => [
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 2,
      title: "Functional Component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 3,
      title: "Modularization",
      body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 4,
      title: "Lifecycle",
      body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 5,
      title: "ESM",
      body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: 6,
      title: "Module Bundler",
      body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
  ];

  formatCreatedAt = (createdAt) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(createdAt).toLocaleDateString("id-ID", options);
  };

  render() {
    const filteredNotes = this.filterNotes();
    const remainingCharacters = this.countRemainingCharacters();

    return (
      <div className="App">
        <h1> Catatan Pribadi</h1>
        <input
          type="text"
          placeholder="Cari catatan..."
          value={this.state.searchText}
          onChange={(e) => this.setState({ searchText: e.target.value })}
        />
        <div>
          <input
            type="text"
            placeholder="Judul catatan"
            value={this.state.newNoteTitle}
            onChange={(e) => {
              if (e.target.value.length <= this.state.maxTitleLength) {
                this.setState({ newNoteTitle: e.target.value });
              }
            }}
          />
          <span>{remainingCharacters} karakter tersisa</span>
          <textarea
            placeholder="Isi catatan"
            value={this.state.newNoteBody}
            onChange={(e) => this.setState({ newNoteBody: e.target.value })}
          />
          <button id="tambah" onClick={this.addNewNote}>
            Tambah Catatan
          </button>
        </div>

        <h2>Catatan Tidak Diarsip</h2>
        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <p>Tidak ada catatan</p>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className={note.archived ? "archived" : ""}>
                <h3>{note.title}</h3>
                <p>{this.formatCreatedAt(note.createdAt)}</p> <p>{note.body}</p>
                <button onClick={() => this.toggleArchive(note.id)}>
                  {note.archived ? "Batal Arsip" : "Arsipkan"}
                </button>
                <button id="hapus" onClick={() => this.deleteNote(note.id)}>
                  Hapus
                </button>
              </div>
            ))
          )}
        </div>

        <h2>Catatan Diarsip</h2>
        <div className="notes-list">
          {this.state.archivedNotes.length === 0 ? (
            <p>Tidak ada catatan diarsipkan</p>
          ) : (
            this.state.archivedNotes.map((note) => (
              <div key={note.id} className="archived">
                <h3>{note.title}</h3>
                <p>{this.formatCreatedAt(note.createdAt)}</p> <p>{note.body}</p>
                <button id="batal" onClick={() => this.unarchiveNote(note.id)}>
                  Batal Arsip
                </button>
                <button
                  id="hapus"
                  onClick={() => this.deleteArchivedNote(note.id)}
                >
                  Hapus
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
