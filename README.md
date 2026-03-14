# Image-processing-API
# Image Processing API

An image processing API built with Node.js, Express, and TypeScript. This API serves as a rapid prototyping tool that allows users to place placeholder images into their web applications by specifying an image name, width, and height via URL parameters. It resizes images efficiently using the `sharp` library and caches the output to provide fast re-serving of previously processed images.

## Scripts to Run the Application

- **Build**: `npm run build`
  Compiles TypeScript code into standard JavaScript in the `dist` folder.
- **Start**: `npm run start`
  Starts the node server using the compiled JavaScript code from the `dist` folder.
- **Development**: `npm run dev`
  Starts a local development server using `tsx` directly on the TypeScript source code for testing during development.
- **Test**: `npm run test`
  Builds the application and runs the Jasmine test suite to evaluate the application code.

## Available Endpoints

By default, the application runs on `http://localhost:5000`.

### 1. Health Check
- **Endpoint**: `GET /`
- **Description**: Verifies that the API server is up and running.
- **Example**: `http://localhost:5000/`

### 2. Image Resizing
- **Endpoint**: `GET /api/images`
- **Description**: Accesses the image processing module. Provide a filename, width, and height as query parameters to retrieve a scaled version of an existing image.
- **Query Parameters**:
  - `filename`: The name of the file (including extension) located in the `images` folder (e.g., `encenadaport.jpg`, `fjord.jpg`, `icelandwaterfall.jpg`, `palmtunnel.jpg`, `santamonica.jpg`).
  - `width`: Desired width in pixels (must be a positive integer).
  - `height`: Desired height in pixels (must be a positive integer).
- **Example Usage**: `http://localhost:3000/api/images?filename=encenadaport.jpg&width=200&height=200`

If the `width` and `height` parameters are excluded, the API bypasses the processing step:
- **Example**: `http://localhost:3000/api/images?filename=encenadaport.jpg`

## Additional Functionality & Features

- **Robust Caching / Re-saving**: When an image is resized, the resultant image is securely cached in the `images/thumb` directory. If a user queries for the identical `filename`, `width`, and `height` again, the server smartly bypasses the heavy `sharp` processing and serves the cached thumbnail directly. To test this, you can manually delete a thumbnail from the `images/thumb` directory and verify that it is properly re-created on the next matching GET request.
- **Custom Validation Middleware**: The API avoids crashing from malicious or improper user input by using a custom validation middleware. It extensively checks if the `filename` exists, and whether `width` and `height` are strictly valid, strictly positive numerical characters. Helpful error messages are returned informing the client of the mistake.
- **Automated Testing Suite**: Tested efficiently using Jasmine and Supertest testing endpoints and utility processing behaviors.
- **Typescript Integrated**: Built consistently with TypeScript to ensure type safety, fewer runtime errors, and a highly scalable backend architecture.
