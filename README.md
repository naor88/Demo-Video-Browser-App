# Demo-Video-Browser-App

Welcome to the **Demo-Video-Browser-App** repository! This project is designed to provide a seamless interface for browsing and managing video content. The application is built using Next.js and follows a structured approach to filter and display videos based on user inputs.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Requirements](#requirements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Video**: Search videos by artist name or title using a text input field. The list updates automatically as you type.
- **Filter by Year**: A dropdown to filter videos by a single selected year.
- **Filter by Genre**: A dropdown to filter videos by multiple selected genres, without repeating any genre.
- **Responsive Video List**: Display a scrollable list of video cards that automatically updates based on selected filters. The list shows 1-3 videos per row depending on the screen size.
- **Video Card Details**: Each video card displays the video image, title, artist, and year.
- **API Integration**: Fetch video data from a remote API with proper loading indicators and error handling.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/naor88/Demo-Video-Browser-App.git
   cd Demo-Video-Browser-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

## Usage

Once the application is running, you can access it through your web browser. The interface allows you to filter videos by entering an artist name or title, selecting a year, and choosing genres from the dropdowns.

### API Endpoint

The video data is fetched from the following URL:
```
https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json
```

## Live Demo

Check out the live demo of the application [here](https://demo-video-browser-app.netlify.app/).

## Requirements

For detailed requirements, please refer to the [Requirements Document](https://docs.google.com/document/d/1H3AZzlXYJ9XqEqG6-G-1VVc7kvEHtGL7OY3ODuUtvRw/edit).

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to explore the repository and contribute. If you have any questions or issues, please open an issue on GitHub.

Enjoy browsing your media with **Demo-Video-Browser-App**!

