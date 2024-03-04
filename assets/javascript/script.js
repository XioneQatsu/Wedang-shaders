const wedangSrc = 'https://xioneqatsu.github.io/Wedang-shaders/',
see_all_version = {
  id: 'all_version',
  url: `${wedangSrc}all_version.html`
};

function wedang_content() {
  fetch(`${wedangSrc}assets/javascript/data.json`)
  .then(file => file.json())
  .then(data => {
    let intro = data.intro, screenshot = data.screenshot, changelog = data.changelogs, download = data.download,
    content = `
    <div class="card-column-1">
      <div class="card radius-all box-shadow">
        <div class="card-text radius-tlr">
          <h3 class="font-color">${intro.title}</h3>
        </div>
        <div class="card-text radius-tlr">
          <p class="font-color">${intro.description}</p>
        </div>
      </div>
    </div>
    <div class="card-column-2">
      <div class="card radius-all box-shadow">
        <div class="card-text">
          <h3 class="font-color">Downloads</h3>
        </div>
        <div class="card-btn" id="${download.shaders[0].id}">${download.shaders[0].name}</div>
        <div class="card-btn" id="${download.textures[0].id}">${download.textures[0].name}</div>
        <a class="font-color" id="${see_all_version.id}">See all version</a>
      </div>
    </div>
    <div class="card-column-2">
      <div class="card radius-all box-shadow">
        <div class="card-text radius-tlr">
          <h3 class="font-color">Changelogs:</h3>
        </div>
        <div class="card-text-block-scroll-h2 radius-tlr">`;
          changelog.forEach(data => {
            content += `<h4 class="font-color">${data.date}</h4>`;
            data.changelog.forEach(data => {
              content += `<p class="font-color">${data.text}<br></p>`;
            });
            content += '<br>';
          });
          content += `
        </div>
      </div>
    </div>
    <div class="card-column-1">
      <div class="card radius-all box-shadow">
        <div class="card-text radius-tlr">
          <h3 class="font-color">Screenshot</h3>
        </div>`;
          screenshot.image.forEach(data => {
            content += `
            <a href="${wedangSrc+data.url}">
              <img class="card-image-screenshot border-all" src="${wedangSrc+data.url}" alt="screenshots">
            </a>`;
          });
          content += `
      </div>
    </div>
    `;

    document.querySelector('#content-load').innerHTML = content;
    openLink(see_all_version, '_self');
    openLink(download.shaders[0], '_blank');
    openLink(download.textures[0], '_blank');
  })
  .catch();
}

function wedang_all_version() {
  fetch(`${wedangSrc}assets/javascript/data.json`)
  .then(file => file.json())
  .then(data => {
    let download = data.download,
    content = `
    <div class="card-column-2">
      <div class="card radius-all box-shadow">
        <div class="card-text">
          <h3 class="font-color">Shaders</h3>
        </div>`;
        download.shaders.forEach(data => { content += `<div class="card-btn" id="${data.id}">${data.name}</div>`; });
        content+= `
      </div>
    </div>
    <div class="card-column-2">
      <div class="card radius-all box-shadow">
        <div class="card-text">
          <h3 class="font-color">Textures</h3>
        </div>`;
        download.textures.forEach(data => { content += `<div class="card-btn" id="${data.id}">${data.name}</div>`; });
        document.querySelector('#content-load').innerHTML = content + `
      </div>
    </div>`;
    download.shaders.forEach(data => { openLink(data, '_blank'); });
    download.textures.forEach(data => { openLink(data, '_blank'); });
  })
  .catch();
}
