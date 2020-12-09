import agent from './agent';

const Explore = {
  namespaced: true,
  state: {
    information: '',
    works: [],
  },
  mutations: {
    GETWORKS(state, payload) {
      state.works = payload;
    },
  },
  actions: {
    getAllWorks({ commit }, { time_range }) {
      agent
        .get(`explore/getPublicWorks?time_range=${time_range}`)
        .then(res => {
          commit('GETWORKS', res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    openPortfolio({ commit }, { _id, path }) {
      agent
        .post(
          'explore/openpdf',
          { pdf_id: _id, pdf_file_path: path },
          { responseType: 'blob' }
        )
        .then(res => {
          var fileURL = window.URL.createObjectURL(
            new Blob([res.data], {
              type: 'application/pdf',
            })
          );
          var fileLink = document.createElement('a');
          window.open(fileURL);
        })
        .catch(err => {
          console.error(err);
        });
    },
    downloadPortfolio({ commit }, { _id, path }) {
      agent
        .post(
          'explore/downloadpdf',
          { pdf_id: _id, pdf_file_path: path },
          { responseType: 'blob' }
        )
        .then(res => {
          var fileURL = window.URL.createObjectURL(
            new Blob([res.data], {
              type: 'application/pdf',
            })
          );
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'sheet.pdf');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          console.error(err);
        });
    },
    downloadSepPiano({ commit }, { _id, path }) {
      agent
        .post(
          'explore/download_sep_piano',
          { pdf_id: _id, sep_piano_path: path },
          { responseType: 'blob' }
        )
        .then(res => {
          var fileURL = window.URL.createObjectURL(
            new Blob([res.data], {
              type: 'application/octet-stream',
            })
          );
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'separated-piano.mp3');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          console.error(err);
        });
    },
    downloadSepHuman({ commit }, { _id, path }) {
      agent
        .post(
          'explore/download_sep_human',
          { pdf_id: _id, sep_human_path: path },
          { responseType: 'blob' }
        )
        .then(res => {
          var fileURL = window.URL.createObjectURL(
            new Blob([res.data], {
              type: 'application/octet-stream',
            })
          );
          var fileLink = document.createElement('a');

          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'separated-human.mp3');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  getters: {},
};

export default Explore;
