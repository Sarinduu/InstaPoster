const { IgApiClient } = require("instagram-private-api");
const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
require("dotenv").config();

// Create an instance of IgApiClient
const ig = new IgApiClient();

// ---- Image URL -----
const imageUrl = "https://picsum.photos/800/800";
const imageUrl2 =
  "https://firebasestorage.googleapis.com/v0/b/y3s2-ds-assignment02.appspot.com/o/66331778cc3b63436c87508a%2F663317d9cc3b63436c87508d%2Fpng%2Fc9caf0c0fed56bf21a36113f33879fea.jpg?alt=media&token=58fc4299-a724-49ba-b686-81c68c5856b4";

// ---- Image Path ----
const imagePath = "images/c9caf0c0fed56bf21a36113f33879fea.jpg";
const imagePath2 = "images/wallpaperflare.com_wallpaper-3.jpg"

// Function to login to Instagram
async function login() {
  // Get credentials from environment variables
  const username = process.env.INSTAGRAM_USERNAME;
  const password = process.env.INSTAGRAM_PASSWORD;

  // Set the state for the IgApiClient instance
  ig.state.generateDevice(username);

  // Attempt to login
  try {
    await ig.account.login(username, password);
    console.log("Successfully logged in!");
  } catch (err) {
    console.error("Login failed:", err);
  }
}

// Function to Fetches an image from a URL and converts it into a buffer
async function getImageBufferFromURL(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary");
  } catch (error) {
    console.error("Failed to fetch image:", error);
    throw error;
  }
}

// Reads an image file asynchronously and converts it into a buffer.
async function imageToBufferAsync(imagePath) {
  try {
    // Read the image file asynchronously
    const buffer = await fs.readFile(imagePath);
    return buffer;
  } catch (error) {
    // If an error occurs during file reading, reject the promise
    throw error;
  }
}

// Function to view user profile by username
async function viewUserProfileByUsername(username) {
  // Login to Instagram
  await login();

  // Retrieve user information by username
  try {
    const userInfo = await ig.user.searchExact(username);
    console.log("User Information:", userInfo);
  } catch (err) {
    console.error("Failed to retrieve user information:", err);
  }
}

// Function to view user profile by user ID
async function viewUserProfileById(userId) {
  // Login to Instagram
  await login();

  // Retrieve user information by user ID
  try {
    const userInfo = await ig.user.info(userId);
    console.log("User Information:", userInfo);
  } catch (err) {
    console.error("Failed to retrieve user information:", err);
  }
}

// Function to post an image using URL
async function postImageUsingURL(imageUrl, caption) {
  // Login to Instagram
  await login();

  // get the image file using URL
  const imageBuffer = await getImageBufferFromURL(imageUrl);

  // Check if the image buffer is obtained successfully
  if (!imageBuffer) {
    console.error("Failed to fetch image buffer");
    return;
  }

  // Attempt to upload and post the image
  try {
    const publishResult = await ig.publish.photo({
      file: imageBuffer,
      caption: caption, // Replace with your caption
    });
    console.log("Image posted successfully:", publishResult);
  } catch (err) {
    console.error("Failed to post image:", err);
  }
}

// Function to post an image in the iamge folder
async function postImageIntheFolder(imagePath, caption) {
  // Login to Instagram
  await login();

  // get the image file in image folder
  const imageBuffer = await imageToBufferAsync(imagePath);

  // Check if the image buffer is obtained successfully
  if (!imageBuffer) {
    console.error("Failed to fetch image buffer");
    return;
  }

  // Attempt to upload and post the image
  try {
    const publishResult = await ig.publish.photo({
      file: imageBuffer,
      caption: caption, // Replace with your caption
    });
    console.log("Image posted successfully:", publishResult);
  } catch (err) {
    console.error("Failed to post image:", err);
  }
}

////////////////////////////////////////////----------------////////////////////////////////////////////

// -- Example usage: post Image using URL -- function 01
// postImageUsingURL(imageUrl, "A mystical castle");

// -- Example usage: post Image in the image folder -- function 02
postImageIntheFolder(imagePath2, "A mystical castle");

////////////////////////////////////////////----------------////////////////////////////////////////////

// -- Example usage: View user profile by username
// viewUserProfileByUsername("username");

// -- Example usage: View user profile by user ID
// viewUserProfileById('user_id');

// // Checks if an image file exists at the specified path.
// function isImageFileExists(imagePath) {
//   // Check if the file exists at the specified path
//   return fs.existsSync(imagePath);
// }

// if (isImageFileExists(imagePath)) {
//     console.log('Image file exists:', imagePath);
//     // Proceed with further operations...
//   } else {
//     console.log('Image file does not exist:', imagePath);
//     // Handle the case where the image file does not exist...
//   }
