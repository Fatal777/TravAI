# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
travel-companion
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  └─ RegisterForm.jsx
│  │  ├─ common
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ ProtectedRoute.jsx
│  │  ├─ dashboard
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ QuickStats.jsx
│  │  │  ├─ TripCard.jsx
│  │  │  ├─ TripPreviewDialog.jsx
│  │  │  └─ TripsList.jsx
│  │  ├─ ImageGallery.jsx
│  │  ├─ PrivateRoute.jsx
│  │  └─ tripPlanner
│  │     ├─ BudgetChart.jsx
│  │     ├─ CollaboratorsPanel.jsx
│  │     ├─ DestinationSelector.jsx
│  │     ├─ FlightOptions.jsx
│  │     ├─ HotelOptions.jsx
│  │     ├─ ItineraryScheduler.jsx
│  │     ├─ MoodBoard.jsx
│  │     └─ TripForm.jsx
│  ├─ contexts
│  │  ├─ AuthContext.jsx
│  │  └─ TripContext.jsx
│  ├─ firebase
│  │  └─ config.js
│  ├─ hooks
│  │  ├─ useAuth.jsx
│  │  ├─ useCollaborators.jsx
│  │  └─ useTrips.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CreateTrip.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ EditTrip.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Register.jsx
│  │  └─ ViewTrip.jsx
│  ├─ services
│  │  ├─ collaborationService.js
│  │  ├─ openAIService.js
│  │  ├─ tripService.js
│  │  └─ userService.js
│  └─ utils
│     ├─ dateUtils.js
│     ├─ formatters.js
│     ├─ unsplash.js
│     └─ validators.js
├─ tailwind.config.js
└─ vite.config.js
```





```
travel-companion
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  └─ RegisterForm.jsx
│  │  ├─ common
│  │  │  ├─ ChatBox.jsx
│  │  │  ├─ ErrorBoundary.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ SocialIcons.jsx
│  │  │  └─ ThemeToggle.jsx
│  │  ├─ dashboard
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ QuickStats.jsx
│  │  │  ├─ TripCard.jsx
│  │  │  ├─ TripPreviewDialog.jsx
│  │  │  └─ TripsList.jsx
│  │  ├─ ImageGallery.jsx
│  │  ├─ PrivateRoute.jsx
│  │  └─ tripPlanner
│  │     ├─ BudgetChart.jsx
│  │     ├─ CollaboratorsPanel.jsx
│  │     ├─ DestinationSelector.jsx
│  │     ├─ FlightOptions.jsx
│  │     ├─ HotelOptions.jsx
│  │     ├─ ItineraryScheduler.jsx
│  │     ├─ MoodBoard.jsx
│  │     └─ TripForm.jsx
│  ├─ contexts
│  │  ├─ AuthContext.jsx
│  │  └─ TripContext.jsx
│  ├─ firebase
│  │  └─ config.js
│  ├─ hooks
│  │  ├─ useAuth.jsx
│  │  ├─ useCollaborators.jsx
│  │  └─ useTrips.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Analytics.jsx
│  │  ├─ CreateTrip.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ EditTrip.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyTrips.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Register.jsx
│  │  ├─ Settings.jsx
│  │  ├─ TripPlanner.jsx
│  │  └─ ViewTrip.jsx
│  ├─ services
│  │  ├─ api.js
│  │  ├─ collaborationService.js
│  │  ├─ openAIService.js
│  │  ├─ tripService.js
│  │  └─ userService.js
│  ├─ styles
│  │  └─ auth.css
│  └─ utils
│     ├─ dateUtils.js
│     ├─ formatters.js
│     ├─ unsplash.js
│     └─ validators.js
├─ tailwind.config.js
└─ vite.config.js

```
```
travel-companion
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ public
│  ├─ favicon.png
│  └─ Trav.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ Trav.svg
│  │  ├─ Travpngwithbg.png
│  │  ├─ Travwithbg.svg
│  │  └─ withoutbgpng.png
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  └─ RegisterForm.jsx
│  │  ├─ common
│  │  │  ├─ ChatBox.jsx
│  │  │  ├─ ErrorBoundary.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ SocialIcons.jsx
│  │  │  ├─ SplashScreen.jsx
│  │  │  └─ ThemeToggle.jsx
│  │  ├─ dashboard
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ QuickStats.jsx
│  │  │  ├─ TripCard.jsx
│  │  │  ├─ TripPreviewDialog.jsx
│  │  │  └─ TripsList.jsx
│  │  ├─ ImageGallery.jsx
│  │  ├─ PrivateRoute.jsx
│  │  └─ tripPlanner
│  │     ├─ BudgetChart.jsx
│  │     ├─ CollaboratorsPanel.jsx
│  │     ├─ CountrySearch.jsx
│  │     ├─ DestinationSelector.jsx
│  │     ├─ FlightOptions.jsx
│  │     ├─ HotelOptions.jsx
│  │     ├─ ItineraryScheduler.jsx
│  │     ├─ MoodBoard.jsx
│  │     └─ TripForm.jsx
│  ├─ contexts
│  │  ├─ AuthContext.jsx
│  │  ├─ ThemeContext.jsx
│  │  └─ TripContext.jsx
│  ├─ firebase
│  │  └─ config.js
│  ├─ hooks
│  │  ├─ useAuth.jsx
│  │  ├─ useCollaborators.jsx
│  │  └─ useTrips.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Analytics.jsx
│  │  ├─ CreateTrip.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ EditTrip.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyTrips.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Register.jsx
│  │  ├─ Settings.jsx
│  │  ├─ TripPlanner.jsx
│  │  └─ ViewTrip.jsx
│  ├─ services
│  │  ├─ api.js
│  │  ├─ collaborationService.js
│  │  ├─ openAIService.js
│  │  ├─ tripService.js
│  │  └─ userService.js
│  ├─ styles
│  │  └─ auth.css
│  └─ utils
│     ├─ dateUtils.js
│     ├─ formatters.js
│     ├─ unsplash.js
│     └─ validators.js
├─ tailwind.config.js
└─ vite.config.js

```
```
travel-companion
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ public
│  ├─ favicon.png
│  └─ Trav.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ Trav.svg
│  │  ├─ Travpngwithbg.png
│  │  ├─ Travwithbg.svg
│  │  └─ withoutbgpng.png
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  └─ RegisterForm.jsx
│  │  ├─ common
│  │  │  ├─ ChatBox.jsx
│  │  │  ├─ ErrorBoundary.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ SocialIcons.jsx
│  │  │  ├─ SplashScreen.jsx
│  │  │  └─ ThemeToggle.jsx
│  │  ├─ dashboard
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ QuickStats.jsx
│  │  │  ├─ TripCard.jsx
│  │  │  ├─ TripPreviewDialog.jsx
│  │  │  └─ TripsList.jsx
│  │  ├─ ImageGallery.jsx
│  │  ├─ PrivateRoute.jsx
│  │  └─ tripPlanner
│  │     ├─ BudgetChart.jsx
│  │     ├─ CollaboratorsPanel.jsx
│  │     ├─ CountrySearch.jsx
│  │     ├─ DestinationSelector.jsx
│  │     ├─ FlightOptions.jsx
│  │     ├─ HotelOptions.jsx
│  │     ├─ ItineraryScheduler.jsx
│  │     ├─ MoodBoard.jsx
│  │     └─ TripForm.jsx
│  ├─ contexts
│  │  ├─ AuthContext.jsx
│  │  ├─ ThemeContext.jsx
│  │  └─ TripContext.jsx
│  ├─ firebase
│  │  └─ config.js
│  ├─ hooks
│  │  ├─ useAuth.jsx
│  │  ├─ useCollaborators.jsx
│  │  └─ useTrips.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Analytics.jsx
│  │  ├─ CreateTrip.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ EditTrip.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyTrips.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Register.jsx
│  │  ├─ Settings.jsx
│  │  ├─ TripPlanner.jsx
│  │  └─ ViewTrip.jsx
│  ├─ services
│  │  ├─ api.js
│  │  ├─ collaborationService.js
│  │  ├─ openAIService.js
│  │  ├─ tripService.js
│  │  └─ userService.js
│  ├─ styles
│  │  └─ auth.css
│  └─ utils
│     ├─ dateUtils.js
│     ├─ formatters.js
│     ├─ unsplash.js
│     └─ validators.js
├─ tailwind.config.js
└─ vite.config.js

```
```
travel-companion
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ public
│  ├─ favicon.png
│  └─ Trav.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ Trav.svg
│  │  ├─ Travpngwithbg.png
│  │  ├─ Travwithbg.svg
│  │  └─ withoutbgpng.png
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  └─ RegisterForm.jsx
│  │  ├─ common
│  │  │  ├─ ChatBox.jsx
│  │  │  ├─ ErrorBoundary.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  ├─ Sidebar.jsx
│  │  │  ├─ SocialIcons.jsx
│  │  │  ├─ SplashScreen.jsx
│  │  │  └─ ThemeToggle.jsx
│  │  ├─ dashboard
│  │  │  ├─ DashboardLayout.jsx
│  │  │  ├─ QuickStats.jsx
│  │  │  ├─ TripCard.jsx
│  │  │  ├─ TripPreviewDialog.jsx
│  │  │  └─ TripsList.jsx
│  │  ├─ ImageGallery.jsx
│  │  ├─ PrivateRoute.jsx
│  │  └─ tripPlanner
│  │     ├─ BudgetChart.jsx
│  │     ├─ CollaboratorsPanel.jsx
│  │     ├─ CountrySearch.jsx
│  │     ├─ DestinationSelector.jsx
│  │     ├─ FlightOptions.jsx
│  │     ├─ HotelOptions.jsx
│  │     ├─ ItineraryScheduler.jsx
│  │     ├─ MoodBoard.jsx
│  │     └─ TripForm.jsx
│  ├─ contexts
│  │  ├─ AuthContext.jsx
│  │  ├─ ThemeContext.jsx
│  │  └─ TripContext.jsx
│  ├─ firebase
│  │  └─ config.js
│  ├─ hooks
│  │  ├─ useAuth.jsx
│  │  ├─ useCollaborators.jsx
│  │  └─ useTrips.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Analytics.jsx
│  │  ├─ CreateTrip.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ EditTrip.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyTrips.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Register.jsx
│  │  ├─ Settings.jsx
│  │  ├─ TripPlanner.jsx
│  │  └─ ViewTrip.jsx
│  ├─ services
│  │  ├─ api.js
│  │  ├─ collaborationService.js
│  │  ├─ openAIService.js
│  │  ├─ tripService.js
│  │  └─ userService.js
│  ├─ styles
│  │  └─ auth.css
│  └─ utils
│     ├─ dateUtils.js
│     ├─ formatters.js
│     ├─ unsplash.js
│     └─ validators.js
├─ tailwind.config.js
└─ vite.config.js

```