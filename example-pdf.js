const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const { formatTitle } = require("./utils/format-title");

console.time("renderPDF");

const post = {
  title: "Draw and save images with Canvas and Node",
  author: "Sean C Davis",
};
// Move the title formatter up farther because we're going to
// use it to set our Y values.
const titleText = formatTitle(post.title);

const width = 1200;
const height = 627;
const imagePosition = {
  w: 400,
  h: 88,
  x: 400,
  // Calculate the Y of the image based on the number of
  // lines in the title.
  y: titleText.length === 2 ? 75 : 100,
};
// Do the same with the title's Y value.
const titleY = titleText.length === 2 ? 300 : 350;
const titleLineHeight = 100;
// And the author's Y value.
const authorY = titleText.length === 2 ? 525 : 500;

const canvas = createCanvas(width, height, "pdf");
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";

context.fillText(titleText[0], 600, titleY);
if (titleText[1]) context.fillText(titleText[1], 600, titleY + titleLineHeight);

context.font = "40pt 'PT Sans'";
context.fillText(`by ${post.author}`, 600, authorY);

loadImage("./assets/logo.png").then((image) => {
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  const buffer = canvas.toBuffer("application/pdf", {
    title: "my picture",
    keywords: "node.js demo cairo",
    creationDate: new Date(),
  });

  fs.writeFileSync("./result.pdf", buffer);
});

console.timeEnd("renderPDF");
