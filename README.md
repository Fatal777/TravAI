# TravAI - Intelligent Travel Planner ( React + Vite)

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![KendoReact](https://img.shields.io/badge/KendoReact-15_Components-blueviolet)](https://www.telerik.com/kendo-react-ui/)
[![Firebase](https://img.shields.io/badge/Firebase-9-red)](https://firebase.google.com)

## Features ✈️
- AI-Powered Itinerary Generation (Cloudflare AI)
- Collaborative Trip Planning
- Smart Packing Lists
- Interactive Scheduler
- Budget Management
- Multi-user Collaboration
- Cross-platform Sync

## Kendo React Components (15 Components) 🔧
1. **Scheduler** (`@progress/kendo-react-scheduler`)
2. **TimelineView** (`@progress/kendo-react-scheduler`)
3. **DateRangePicker** (`@progress/kendo-react-dateinputs`)
4. **Button** + **ButtonGroup** (`@progress/kendo-react-buttons`)
5. **ListBox** (`@progress/kendo-react-listbox`)
6. **Grid** (`@progress/kendo-react-grid`)
7. **Chart** (`@progress/kendo-react-charts`)
8. **Dialog** (`@progress/kendo-react-dialogs`)
9. **Form** (`@progress/kendo-react-form`)
10. **Notification** (`@progress/kendo-react-notification`)
11. **Loader** (`@progress/kendo-react-indicators`)
12. **DropDownList** (`@progress/kendo-react-dropdowns`)
13. **Avatar** (`@progress/kendo-react-layout`)
14. **Input** (`@progress/kendo-react-inputs`)
15. **Tooltip** (`@progress/kendo-react-tooltip`)

## Installation ⚙️
```bash
git clone https://github.com/Fatal777/TravAI.git
cd TravAI
npm install



Configuration 🔒
Create .env file with:
VITE_OPENAI_API_KEY=your_key_here
VITE_UNSPLASH_ACCESS_KEY=your_key_here
VITE_UNSPLASH_SECRET_KEY=your_key_here
VITE_CLOUDFLARE_AI_TOKEN=your_token_here
VITE_PEXELS_API_KEY=your_key_here



Project Structure 📂

├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── public/
│   ├── favicon.png
│   ├── gemini-logo.svg
│   └── Trav.svg
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   ├── airplane.png
│   │   ├── hero-pattern.png
│   │   ├── landmark.png
│   │   ├── suitcase.png
│   │   ├── Trav.svg
│   │   ├── Travpngwithbg.png
│   │   ├── Travwithbg.svg
│   │   └── withoutbgpng.png
│   ├── components/
│   │   ├── auth/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── common/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SocialIcons.jsx
│   │   │   ├── SplashScreen.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── dashboard/
│   │   │   ├── BudgetGrid.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── PackingList.jsx
│   │   │   ├── QuickStats.jsx
│   │   │   ├── TripCard.jsx
│   │   │   ├── TripPreviewDialog.jsx
│   │   │   └── TripsList.jsx
│   │   ├── ImageGallery.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── tripPlanner/
│   │       ├── BudgetChart.jsx
│   │       ├── CollaboratorsPanel.jsx
│   │       ├── CountrySearch.jsx
│   │       ├── DestinationSelector.jsx
│   │       ├── FlightOptions.jsx
│   │       ├── HotelOptions.jsx
│   │       ├── ItineraryAI.jsx
│   │       ├── ItineraryScheduler.jsx
│   │       ├── MoodBoard.jsx
│   │       ├── TripForm.jsx
│   │       └── TripPreview.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── TripContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   ├── useCollaborators.jsx
│   │   └── useTrips.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── Analytics.jsx
│   │   ├── CreateTrip.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditTrip.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyTrips.jsx
│   │   ├── NotFound.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   ├── TripPlanner.jsx
│   │   └── ViewTrip.jsx
│   ├── services/
│   │   ├── aiService.js
│   │   ├── api.js
│   │   ├── cloudflareAIService.js
│   │   ├── collaborationService.js
│   │   ├── openAIService.js
│   │   ├── tripService.js
│   │   └── userService.js
│   ├── styles/
│   │   └── auth.css
│   └── utils/
│       ├── dateUtils.js
│       ├── debounce.js
│       ├── formatters.js
│       ├── unsplash.js
│       └── validators.js
├── tailwind.config.js
└── vite.config.js


Running the App 🚀
Input the following cmds in your terminal
npm install
npm run dev





## License 📄

**MIT License**  

Copyright (c) 2025 Fatal777  

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.  