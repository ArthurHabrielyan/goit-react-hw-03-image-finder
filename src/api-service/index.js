const API_KEY = "26347249-7bd0a4c88189af5f7d992fd4e";
const HTTP = "https://pixabay.com/api/";

export const getData = (query, currentPage) =>
  fetch(
    `${HTTP}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=20`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Something went wrong");
  });
