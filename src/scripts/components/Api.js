export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers : {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)})
      .catch(err => console.log(err));
  }

  getInitialProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers : {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)})
      .then(data => {
        this._userId = data._id;
        return data;
      })
      .catch(err => console.log(err));

  }

  editProfile(name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers : this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)})
    .catch(err => console.log(err));
  }

  editAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers : this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)})
    .catch(err => console.log(err));
  }

  postCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers : this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)})
    .catch(err => console.log(err));

  }

  deleteElement(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers : {
        authorization: this._headers.authorization
      }
    })

  }

  handleLikeClick(evt, cardId) {
    let method = '';
    const likes = evt.target.closest('.element')._likes;

    if (likes.includes(this._userId)) {
      method = 'DELETE'
    } else {
      method = 'PUT'
    };

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers : {
        authorization: this._headers.authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)})
    .catch(err => console.log(err));
  }

}
