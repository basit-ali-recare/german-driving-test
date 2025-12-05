# 🚗 Fahrprüfung Berlin - German Driving Exam Prep

A comprehensive React app to prepare for the German practical driving exam (Fahrprüfung), specifically tailored for Berlin. Learn examiner commands with German audio and English subtitles!

![Fahrprüfung Berlin App](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## ✨ Features

### 📚 Exam Commands (59 commands)
- **8 Categories**: Directions, Parking, Highway, Maneuvers, Emergency, Technical, Observations, Traffic Signs
- **German Audio**: Click to hear commands spoken in German using Web Speech API
- **English Translations**: Understand what each command means
- **Helpful Tips**: Contextual advice for each command
- **Progress Tracking**: Mark commands as learned, saved to localStorage

### 🎯 Practice Mode
- **Flashcard-style Learning**: Hear German commands, reveal the answer
- **Score Tracking**: Track correct/incorrect answers
- **Category Filtering**: Focus on specific command types
- **Progress Indicator**: See how many commands you've practiced

### 🎬 Interactive Scenarios (NEW!)
Animated driving simulations showing proper behavior:

| Scenario | German | Description |
|----------|--------|-------------|
| 🚴 Cyclist Right Turn | Rechts abbiegen mit Radfahrer | Most common fail reason in Berlin! |
| 👁️ Shoulder Check | Schulterblick | Missing = instant fail! |
| 🚃 Tram Stop | Straßenbahnhaltestelle | Berlin-specific tram rules |
| 🔄 Roundabout | Kreisverkehr | Yield + signal right when exiting |
| 🚦 Yellow Light | Gelbe Ampel | Stop or go decision |
| 🚗 Emergency Brake | Gefahrbremsung | Exam requirement |

### 🔧 Technical Questions (25 questions)
Pre-driving technical questions about:
- 💡 Lights (Abblendlicht, Fernlicht, etc.)
- 💧 Fluids (Oil, Coolant, Brake fluid)
- 🛞 Tires (Pressure, Tread depth)
- 📊 Dashboard warnings
- 🛡️ Safety equipment (Warning triangle, First aid kit)
- 📄 Required documents

### 📍 Berlin-Specific Tips
- Tram rules and right of way
- Extensive bike lane network
- Bus lane regulations
- Tempo 30 zones
- Right before left (Rechts vor Links)
- Common reasons for failing in Berlin

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fahrpruefung-berlin.git
cd fahrpruefung-berlin

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🛠️ Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible Components
- **Lucide React** - Icons
- **Web Speech API** - German Text-to-Speech

## 📱 Screenshots

### Commands View
Learn all 59 examiner commands with German audio playback.

### Practice Mode
Test your knowledge with flashcard-style practice.

### Interactive Scenarios
Watch animated driving scenarios with step-by-step instructions.

### Technical Questions
Prepare for pre-driving technical questions.

## 🇩🇪 About the German Driving Exam

The practical driving exam (Praktische Fahrprüfung) in Germany consists of:

1. **Technical Questions** (3-5 questions before driving)
2. **Driving Portion** (45-55 minutes)
3. **Special Maneuvers** (Parking, emergency brake, etc.)

### Instant Fail Actions ⚠️
- Running a red light
- Missing shoulder check (Schulterblick) before turning
- Not stopping for pedestrians on zebra crossing
- Not yielding to trams when doors open
- Dangerous lane change

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🍀 Viel Erfolg!

Good luck with your Fahrprüfung! 🚗

---

Made with ❤️ for everyone learning to drive in Germany
