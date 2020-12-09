import agent from './agent';
import axios from 'axios';

const Converter = {
  namespaced: true,
  state: {
    information: '',
    file_path: '',
    file_name: '',
  },
  mutations: {
    GETFILEPATH(state, payload) {
      state.file_path = payload;
    },
    GETFILENAME(state, payload) {
      state.file_name = payload;
    },
  },
  actions: {
    async save_music_information(
      { commit },
      {
        title,
        description,
        ispublic,
        isseparate,
        isconvert,
        file_path,
        file_name,
      }
    ) {
      await agent
        .post('convert/information' ,{
          file_path: '',
          title: title,
          description: description,
          ispublic: ispublic,
          isseparate: isseparate,
          isconvert: isconvert,
          file_path: file_path,
          file_name: file_name,
        })
        .catch(err => {
          console.error(err);
          return false;
        });
      
      return true;
    },
    async save_music_file({ commit }, file) {
      let data = new FormData();
      data.append('file', file)
      let info = await agent
        .post('convert/music', data, { headers: { 'Content-Type': 'multipart/form-data', 'Accept': '*/*' } })
        .then(res => {
          return {
            file_path: res.data.message.file_path,
            file_name: res.data.message.file_name
          }
        })
        .catch(err => {
          console.error(err);
        });
      
      return info;
    },
  },
  getters: {},
};

export default Converter;
