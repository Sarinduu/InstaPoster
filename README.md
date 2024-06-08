# InstaPoster

InstaPoster is a Node.js application that allows you to post images to Instagram using the `instagram-private-api` library.

## Setup

1. Clone the repository and navigate to the project directory.

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a .env file in the root directory and add your Instagram credentials:

   ```sh
   INSTAGRAM_USERNAME=your_username
   INSTAGRAM_PASSWORD=your_password
   ```

4. Place the image you want to post in the images folder.

   **Please add only JPEG images under 250KB**

5. Add that image path to the **postImageIntheFolder** function

    ```sh 
    postImageIntheFolder("image path") 
    ```

6. Run the application
    ```sh
    npm start
    ```