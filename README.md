# CoopaASI

**Your Permanent, AI-Powered Digital Vault.**

CoopaASI is a Web3-based personal AI assistant that provides users with a permanent, encrypted "digital vault" on the Arweave permaweb. Our core innovation is enabling users to intelligently query their on-chain data (such as images and text) using natural language. By combining the permanence of Arweave with AI-powered semantic search, we give users true sovereignty over their digital memories and assets.

---

## 🚀 Core Features

* **Permanent Storage:** All user data is uploaded to the Arweave permaweb via the Turbo SDK, ensuring it is permanent, immutable, and censorship-resistant.
* **User Sovereignty:** Data is encrypted locally before upload using a key derived from the user's wallet signature, meaning only the user can ever access their data.
* **AI-Powered Semantic Search:** Leveraging Google's Gemini models, CoopaASI automatically analyzes and indexes uploaded content. Users can retrieve their assets using natural language queries, searching by meaning, not just filenames.
* **Web3 Identity:** Utilizes MetaMask for secure, decentralized authentication and identity management.
* **AI Assistant Tools:** Equipped with a suite of tools including email creation, scheduling, note-taking, and Google Calendar integration.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** HTML, CSS, Vanilla JavaScript
* **Permanent Storage:** Arweave (via Turbo SDK)
* **AI & Embeddings:** Google Gemini 1.5 Pro & `text-embedding-004`
* **Database:** SQLite with a local vector index
* **Authentication:** MetaMask (EVM Wallet Signatures)

## 🎬 Live Demo

You can view a short demo of the working prototype showcasing the core functionality here:
**[https://youtu.be/bknV_oU7Zkc](https://youtu.be/bknV_oU7Zkc)**

## ⚙️ Getting Started (For Development)

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher recommended)
* npm

### Installation

1.  Clone the repo (if you have access)
    ```sh
    git clone [YOUR_REPO_URL_HERE]
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root directory and populate it with the necessary API keys (GEMINI_API_KEY, EVM_PRIVATE_KEY, ALCHEMY_API_KEY, etc.).
4.  Start the server
    ```sh
    npm start
    ```
5.  Open your browser and navigate to `http://localhost:3000`.

## 📬 Contact

Selçuk Gence - [N1001sg@gmail.com](mailto:N1001sg@gmail.com)

Project Link: [CoopaASI GitHub Deposu](https://github.com/NativeSatoshi/CoopoASI)
