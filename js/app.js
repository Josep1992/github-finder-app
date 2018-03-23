let url = 'https://api.github.com/users/';

let form, inputValue, submitBtn, output;

output = document.querySelector('#output');
form = document.querySelector('form');
inputValue = form.elements[0];
submit = form.elements[1];

const getData = () => {
  fetch(`${url}${inputValue.value.toLowerCase()}`)
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText
        });
      } else {
        return res.json();
      }
    })
    .then(user => {
      let html = `
        <div>
          <h2>${user.name}</h2>
          <img src="${user.avatar_url}" alt="avatar">
        </div>
        <div>
          <ul>
          <li>Location: ${user.location}</li>
          <li>Repositories: ${user.public_repos}</li>
          <li>Bio: ${user.bio}</li>
          <li><a href="${
            user.html_url
          }" target="_blank" rel="noopener noreferrer"><i class="fa fa-github-alt"></i> Click Me!</a></li>
          </ul>
        </div>
        `;
      // Add the html to the output section
      output.innerHTML = html;
    })
    .catch(error => {
      if (error.status === 404) {
        output.innerHTML = `<h2>Username not found, please try another.</h2>`;
      }
    });
};

// ========================================
// ***************Events*******************
// ========================================

submit.addEventListener('click', event => {
  event.preventDefault();
  getData();
  // Clear's the input after fetching the data
  inputValue.value = '';
});

// Date
document.querySelector('#date').innerHTML = new Date().getUTCFullYear();
