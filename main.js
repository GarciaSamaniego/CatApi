console.log("Hola buenas");

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_FAVORITES_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

async function loadRandomMichis() {
  try {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log(data);
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
  } catch (error) {
    console.error(error);
  }
}

async function loadFavoritesMichis() {
  try {
    const res = await fetch(API_URL_FAVORITES, {
      method: "GET",
      headers: {
        "X-API-KEY": "0be006f9-c3f2-4d95-8ae0-7c4001f9e812",
      },
    });
    const data = await res.json();
    console.log(data);
    const section = document.getElementById("favoriteMichis");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Michis favoritos");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar al michi de favoritos");

      btn.append(btnText);
      img.src = michi.image.url;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  } catch (error) {
    console.error(error);
  }
}

async function saveFavoriteMichi(id) {
  try {
    const res = await fetch(API_URL_FAVORITES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "0be006f9-c3f2-4d95-8ae0-7c4001f9e812",
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });
    const data = await res.json();
    console.log("Save");
    console.log(res);
    loadFavoritesMichis();
  } catch (error) {}
}

async function deleteFavoriteMichi(id) {
  try {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
      method: "DELETE",
      headers: {
        "X-API-KEY": "0be006f9-c3f2-4d95-8ae0-7c4001f9e812",
      },
    });
    const data = await res.json();
    console.log("Michi eliminado");
    loadFavoritesMichis();
  } catch (error) {
      console.error(error);
  }
}

async function uploadMichiPhoto() {
    try {
        const form = document.getElementById("uploadingForm");
        const formData = new FormData(form);
    
        console.log(formData.get('file'));

        const res = await fetch(API_URL_FAVORITES_UPLOAD, {
            method: 'POST',
            headers: {
                'X-API-KEY': '0be006f9-c3f2-4d95-8ae0-7c4001f9e812',
            },
            body: formData,
        })

        const data = await res.json();
        console.log('Foto de michi subida');
        console.log({data});
        console.log(data.url);

        saveFavoriteMichi(data.id);
    } catch(error){
        console.error(error);
    }

}

loadRandomMichis();
loadFavoritesMichis();