import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080/user',
  withCredentials: true
});

class Services {
  //USER SERVICES
  
  //crea un usuario
  createUser() {
    return http.get('/facebook')
  }
  //devuelve todos sus notes
  getAllNotes() {
    return http.get("/allNotes")
  }
  //trae las categorias del usuario
  getCategories() {
    return http.get("/allCategories")
  }
  //filtra las notas por categorias 
  getFilteredCategories(values) {
    return http.get('/filterCategories')
  }
  //crea un nuevo note
  newNote(data) {
    return http.post('/createNote', data)
  }
  //trae el note a editar
  getNote(id) {
    return http.get(`/note/:${id}`)
  }
  //busqueda por params
  getBySearch(search) {
    return http.get(`/noteSearch/:${search}`)
  }
  //edita el note seleccionado
  updateNote(data) {
    return http.patch('/updateNote', data)
  }
  //elimina el note seleccionado
  deleteNote(id) {
    return http.delete(`/deleteNote/${id}`)
  }
  //borra todos sus notes
  deleteAllNotes() {
    return http.delete('/deleteAllNotes')
  }
  //cierra session, destruye cookies
  logOut() {
    return http.get('/logOut')
  }

}

export default new Services();