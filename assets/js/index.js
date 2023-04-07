const avatar = document.getElementById("avatar");
const nickname = document.getElementById("nickname");
const bio = document.getElementById("bio");
const projects = document.getElementById("p");
const repos = document.getElementById("repos");
const footer = document.getElementById("footer");

const username = "nicaksks";
const email = "juliesuzuya@gmail.com";
const n = 4;

const imgs = {
  null: "./assets/imgs/logo/null.png",
  "HTML": "./assets/imgs/logo/html.png",
  "C++": "./assets/imgs/logo/c++.png",
  "Python": "./assets/imgs/logo/python.png",
  "JavaScript": "./assets/imgs/logo/javascript.png",
  "Go": "./assets/imgs/logo/go.png"
};

async function getInfo() {
  const r = await axios.get(`https://api.github.com/users/${username}`)
    .then(response => response.data);

  avatar.src = r.avatar_url;
  nickname.innerHTML = r.name;
  bio.innerHTML = `${r.bio} <br><span><a href="https://twitter.com/${r.twitter_username}" target="_blank" style="color: #1DA1F2; text-decoration: none;">@${r.twitter_username}</a></span> | <span><a href="${r.blog}" target="_blank" style="color: white; text-decoration: none;">${r.blog.replace("https://", "")}</a></span> | <span style="color:green">${r.location}</span>`;
  projects.innerHTML = `Repostórios público: <span style="color:#1DA1F2">${r.public_repos}</span> <br>Meus últimos <span style="color:#1DA1F2">${n}</span> repositórios`;
  footer.innerHTML = `<a href="${r.html_url}" target="_blank"><img src="./assets/imgs/logo/github.png"></a>`;
};

async function getRepos() {

  getInfo();

  const r = await axios.get(`https://api.github.com/users/${username}/repos?sort=created`)
    .then(response => response.data);

  let p;
  r.length > n ? p = n : p = r.length;

  for (i = 0; i < p; i++) {

    let = { html_url, full_name, description, language, stargazers_count, forks_count, pushed_at } = r[i];

    //Descrição;
    description === null ? description = "Sem descrição." : description;

    repos.innerHTML += `<div class="repos"><p><iconify-icon icon="octicon:repo-16"></iconify-icon> <a href="${html_url}" target="_blank">${full_name}<a/> <br>L ${textLength(description)} <br></iconify-icon> <img src=${imgs[language]}> <iconify-icon icon="octicon:star-fill-24" style="color: #DAAA3F"></iconify-icon> ${stargazers_count} <iconify-icon icon="octicon:repo-forked-16" style="color: gray"></iconify-icon> ${forks_count} <br>Atualizado ${checkDate(pushed_at)}</p></div>`;
  };
};

getRepos();

function date() {
  var date = new Date();
  var yyyy = date.getFullYear() + "/";
  var mm = ('0' + (date.getMonth() + 1)).slice(-2) + "/";
  var dd = ('0' + date.getDate()).slice(-2);

  date = yyyy + mm + dd;

  return date;
};

function checkDate(pushed_at) {
  var u = new Date(pushed_at).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  var d1 = new Date(u);
  var d2 = new Date(date());
  var dd = parseInt((d2 - d1) / (1000 * 60 * 60 * 24));

  if (dd <= 0) {
    dd = `<span style="color: #1DA1F2">algumas minutos</span> atrás.`
  } else if (dd === 1) {
    dd = `<span style="color: #1DA1F2">${dd}</span> dia atrás.`
  } else if (dd >= 2) {
    dd = `<span style="color: #1DA1F2">${dd}</span> dias atrás.`
  };

  return dd;
}

function textLength(description) {

  let text = "";

  if(description.length >= 50) {
    text = description.substring(0, 50) + "..."
  } else {
    text = description;
  };

  return text;
}
