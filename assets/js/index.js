const avatar = document.getElementById("avatar");
const nickname = document.getElementById("nickname");
const bio = document.getElementById("bio");
const projects = document.getElementById("p");
const repos = document.getElementById("repos");
const footer = document.getElementById("footer");

const username = "nicaksks";
const n = 4;

async function getInfo(username, n) {
  const data = await fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json());

  avatar.src = data.avatar_url;
  nickname.innerHTML = data.name;
  bio.innerHTML = `${data.bio} <br><span><a href="https://twitter.com/${data.twitter_username}" target="_blank" style="color: #1DA1F2; text-decoration: none;">@${data.twitter_username}</a></span> | <span><a href="${data.blog}" target="_blank" style="color: white; text-decoration: none;">${data.blog.replace("https://", "")}</a></span> | <span style="color:green">${data.location}</span> <br>Following:  <span style="color:#1DA1F2">${data.following}</span> | Followers:  <span style="color:#1DA1F2">${data.followers}</span>`;
  projects.innerHTML = `Public repositories. <span style="color:#1DA1F2">${data.public_repos}</span> <br>My last <span style="color:#1DA1F2">${n}</span> repositories.`;
  footer.innerHTML = `<a href="${data.html_url}" target="_blank"><img src="./assets/imgs/logo/github.png"></a>`;
};

async function getRepos(username, n) {

  getInfo(username, n);

  const data = await fetch(`https://api.github.com/users/${username}/repos?sort=created`)
    .then(response => response.json())

  let p;
  data.length > n ? p = n : p = r.length;

  for (i = 0; i < p; i++) {

    let = { html_url, full_name, description, language, stargazers_count, forks_count, pushed_at } = data[i];

    console.log(language)

    description === null ? description = "No Description." : description;
    repos.innerHTML += `<div class="repos"><p><iconify-icon icon="octicon:repo-16"></iconify-icon> <a href="${html_url}" target="_blank">${full_name}<a/> <br>L ${textLength(description)} <br></iconify-icon> <img src=${imgs(language)}> <iconify-icon icon="octicon:star-fill-24" style="color: #DAAA3F"></iconify-icon> ${stargazers_count} <iconify-icon icon="octicon:repo-forked-16" style="color: gray"></iconify-icon> ${forks_count} <br>Updated ${checkDate(pushed_at)}</p></div>`;
  };
};

function checkDate(pushed_at) {
  const u = new Date(pushed_at).getTime();
  const now = Date.now();
  const diff = now - u;

  const units = [
    { label: 'month', value: 4 * 7 * 24 * 60 * 60 * 1000 },
    { label: 'week', value: 7 * 24 * 60 * 60 * 1000 },
    { label: 'day', value: 24 * 60 * 60 * 1000 },
    { label: 'hour', value: 60 * 60 * 1000 },
    { label: 'minute', value: 60 * 1000 },
  ];

  for (const unit of units) {
    const count = Math.floor(diff / unit.value);
    if (count > 0) {
      return `<span style="color: #1DA1F2">${count} ${unit.label}${count > 1 ? 's' : ''}</span> ago`;
    }
  }

  return `a <span style="color: #1DA1F2">few seconds</span> ago`;
}

function textLength(description) {
  return description.length >= 50 ? description.substring(0, 50) + "..." : description;
};

function imgs(img) {
  const imgs = {
    null: "./assets/imgs/logo/null.png",
    "HTML": "./assets/imgs/logo/html.png",
    "C++": "./assets/imgs/logo/c++.png",
    "Python": "./assets/imgs/logo/python.png",
    "JavaScript": "./assets/imgs/logo/javascript.png",
    "Go": "./assets/imgs/logo/go.png",
    "C#": "./assets/imgs/logo/csharp.png",
    "TypeScript": "./assets/imgs/logo/typescript.png"
  };
  return imgs[img];
}

getRepos(username, n);