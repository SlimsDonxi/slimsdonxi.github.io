


function search() {
  // Declare variables
  var input;
  var filter
  var listVideos
  var container;
  var data;

  input = document.querySelector('#searchInput');
  console.log(input.value);
  filter = input.value.toUpperCase();

  container = document.querySelector(".rowVideos");
  listVideos = container.querySelectorAll('.containerVideo');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < listVideos.length; i++) {
    data = listVideos[i].getAttribute("data");
    console.log(data);
  var str = data.toUpperCase(); 
  console.log(str);
    if (str.indexOf(filter) > -1) {
      listVideos[i].style.display = "";
    } else {
      listVideos[i].style.display = "none";
    }
  }
}