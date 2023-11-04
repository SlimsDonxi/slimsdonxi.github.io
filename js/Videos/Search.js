function myFunction() {
  // Declare variables
  var input, filter, container, div, label, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  container = document.getElementById("wrapper");
  a = container.getElementsByTagName('a');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < a.length; i++) {
    label = a[i].getElementsByTagName("label")[0];
    txtValue = label.innerText || label.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}