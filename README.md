
# Erth | إرث 🕌

**Erth** is a production-grade, interactive educational web application designed for children to learn about the great figures of Islamic history, including the Prophets, Sahaba (Companions), and Scholars.

## ✨ Features
- **Flashcards**: Interactive 3D flip cards for quick learning.
- **AI-Style Quizzes**: Procedurally generated quizzes from a high-quality local question bank.
- **Voice Support**: Integrated native browser Text-to-Speech (TTS) for Arabic and English.
- **Bilingual**: Full support for Arabic (RTL) and English (LTR).
- **Gamification**: XP points, levels, and a global (mock) leaderboard.
- **Offline Ready**: Built as a PWA (Progressive Web App) that works without internet after the first visit.
- **Kid-Friendly**: Colorful, Islamic-themed UI with geometric patterns and playful sounds.

## 🛠️ Tech Stack
- **React 19**
- **Tailwind CSS**
- **TypeScript**
- **Web Audio API** (Procedural sound generation)
- **Speech Synthesis API**
- **Workbox** (PWA Caching)

## 🚀 Getting Started
1. Clone the repository to your local machine.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app locally:
   ```bash
   npm run dev
   ```
4. Build production assets:
   ```bash
   npm run build
   ```

## 📦 Deployment (GitHub Pages)
This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push the repository to GitHub on the `main` branch.
2. In GitHub: `Settings` -> `Pages` -> `Build and deployment`.
3. Select `Source: GitHub Actions`.
4. Push to `main` again (or run the workflow manually) to publish.

---
Built with ❤️ for the next generation of scholars.
