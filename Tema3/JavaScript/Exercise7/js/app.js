const pictures = [
  "contBcg-0",
  "contBcg-1",
  "contBcg-2",
  "contBcg-3",
  "contBcg-4"
];

let counter = 0;

function moveLeft() {
  counter--;
  if (counter < 0) {
    counter = pictures.length - 1;
  }
  document.querySelector('.img-container').style.backgroundImage =
    `url('./img/${pictures[counter]}.jpeg')`;
}

function moveRight() {
  counter++;
  if (counter > pictures.length - 1) {
    counter = 0;
  }
  document.querySelector('.img-container').style.backgroundImage =
    `url('./img/${pictures[counter]}.jpeg')`;
}
