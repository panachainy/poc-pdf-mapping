const { createCanvas } = require("canvas");
const fs = require("fs");

const { formatTitle } = require("./utils/format-title");

console.time("renderImage");

// Dimensions for the image
const width = 1765;
const height = 1240;

const titleY = 170;
const lineHeight = 100;
const authorY = 500;

// Instantiate the canvas object
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

// Fill the rectangle with purple
context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 70pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";

const post = {
  title: "Draw and save images with Canvas and Node",
  author: "Sean C Davis",
};

const text = formatTitle(post.title);
context.fillText(text[0], 600, titleY);
if (text[1]) context.fillText(text[1], 600, titleY + lineHeight);

// Render the byline on the image, starting at 600px.
context.font = "40pt 'PT Sans'";
context.fillText(`by ${post.author}`, 600, authorY);

// Write the image to file
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);

console.timeEnd("renderImage");
