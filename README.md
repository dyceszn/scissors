# Scissor

Welcome to Scissor, the ultimate tool for shortening URLs with style. Scissor embodies the concept of brevity and aims to redefine how URLs are shared and managed. Whether for social media, marketing campaigns, or personal use, Scissor is designed to make URLs as short and impactful as possible.

## Overview

Scissor is a URL shortening tool that not only shortens URLs but also offers customization, QR code generation, and analytics features. We believe Scissor can challenge industry giants like Bit.ly and Ow.ly within two years by providing a streamlined and efficient user experience.

## Features

- **URL Shortening:** Quickly shorten long URLs by pasting them into the Scissor platform. The tool generates a compact URL that’s easy to share and manage.
- **Custom URLs:** Customize your shortened URLs with a personal domain name and specific keywords. Perfect for individuals or businesses aiming to create branded links.

- **QR Code Generation:** Generate and download QR codes for your shortened URLs. This feature uses a third-party QR code generator API for seamless integration.

- **Analytics:** Track the performance of your shortened URLs with basic analytics. View click counts and geographical data using Firebase’s analytics features.

## Getting Started

To get started with Scissor, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/scissor.git
   cd scissor
   ```

2. **Install Dependencies:**

   ```bash
   npm install react-router-dom@6
   npm install axios express cors
   ```

3. **Run the Development Server:**

   ```bash
   npm start
   ```

   Visit `http://localhost:3000` in your browser to view the application.

## Project Structure

- **`src/`**: Contains the source code of the application.
  - **`Components/`**: Shared components like `Header`, `Footer`, and `Aside`.
  - **`Contexts/`**: Context providers, such as `UserContext`.
  - **`Style/`**: CSS modules for styling.
  - **`api/`**: API functions for URL shortening and QR code generation.
  - **`pages/`**: React components for different pages (`Home`, `QRcode`, `Analytics`).
  - **`assets/`**: Shared Images
    - **`config/`**: Configuration files

## Contributing

We welcome contributions to enhance the Scissor project. To contribute, please follow these guidelines:

1. **Fork the Repository**
2. **Create a New Branch**
3. **Commit Your Changes**
4. **Push to Your Fork**
5. **Open a Pull Request**

For detailed contribution guidelines, please refer to `CONTRIBUTING.md`.

## License

Scissor is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, feel free to reach out:

- **Email:** duruohaikenna@gmail.com
- **LinkedIn:** [ Ikenna Duruoha ](www.linkedin.com/in/ikennaduruoha)

---
