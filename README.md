# API Integration Project — Node.js + Express

A comprehensive web application that integrates multiple external APIs to display random user profiles with corresponding country information, exchange rates, and news.  
Built using **Node.js**, **Express**, **HTML**, **CSS**, and **JavaScript** as part of a web development assignment.

---

## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---

## Features

- **Random User Generation** with detailed profile information
- **Country Information** including capital, languages, currency, and flag
- **Real-time Exchange Rates** for USD and KZT
- **Latest News** from the user's country
- **Modern, Responsive UI** with smooth animations and hover effects
- **API Integration** with multiple external services
- **Error Handling** with user-friendly error messages
- **Interactive News Carousel** with navigation controls

---

## External APIs Used

| API Service | Purpose | Rate Limits |
|-------------|---------|-------------|
| **Random User API** | Generate random user profiles | Unlimited |
| **API Ninjas (Country API)** | Get detailed country information | 50,000 requests/month |
| **Exchange Rate API** | Get current exchange rates | 1,500 requests/month |
| **News API** | Fetch latest news by country | 100 requests/day |

---

## Project Structure
```
api/
├── server.js # Main Express server
├── app.js # Express application configuration
├── package.json # Project dependencies
├── package-lock.json # Dependency lock file
├── .env # Environment variables (API keys)
├── .gitignore # Git ignore rules
│
├── public/ # Static files
│ └── style.css # Modern CSS styles
│ └── app.js # Client-side JavaScript
│
├── routes/ # API routes
│ └── api.js # Main API endpoint
│
├── services/ # External API services
│ ├── randomUser.js # Random User API integration
│ ├── country.js # Country API integration
│ ├── exchangeRate.js # Exchange Rate API integration
│ └── news.js # News API integration
│
└── views/ # HTML templates
└── index.html # Main application page
```

---

## Data Flow

1. **User clicks "Generate User" button**
2. **Client fetches from `/api/user` endpoint**
3. **Server executes sequential API calls:**

### Server Process
1. **Random User API** → Get random user profile
2. **Country API** → Get user's country information
3. **Exchange Rate API** → Get currency exchange rates
4. **News API** → Get latest country news

4. **Server responds with combined JSON data**
5. **Client renders data with modern UI components**

---

## How to Run the Project

### 1. Install dependencies
```bash
npm install
```
### 2. Configure environment variables
   Create .env file with your API keys:
   
```
PORT=3000
RANDOM_USER_API=https://randomuser.me/api/
COUNTRY_API_KEY=your_api_ninjas_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_key
NEWS_API_KEY=your_news_api_key
```
### 3. Start the server
```
node server.js
```
### 4. Open in browser
```
http://localhost:3000
```
# **How It Works**

### **User Interaction**
-  **User clicks** "Generate User" button
-  **Frontend sends request** to API endpoint

###  **API Request**
-  **Endpoint called:** `GET /api/user`
-  **Loading animation** displayed during fetch

### **Server-Side Process**
-  **Fetches random user data** from Random User API
-  **Extracts country name** from user location
-  **Parallel API calls** for:
    -  **Country info** (capital, languages, currency, flag)
    -  **Exchange rates** (USD, KZT conversions)
    -  **Latest news headlines** (top 5 articles)
-  **Data cleaning & formatting**
-  **Sends structured JSON** to frontend

### **Frontend Rendering**
-  **Renders user profile** with avatar and details
-  **Displays country info** with national flag
-  **Shows exchange rates** in styled cards
-  **Displays news cards** in horizontal scroll layout
-  **Applies smooth animations** on all elements

---

# **Design and UI**

###  **Typography & Layout**
-  **Centered title** with shadow effect
-  **Loading indicator** with modern spinner
-  **Profile-based layout** inspired by portfolio cards

###  **Grid System**
-  **Two-column grid** for user & country info
-  **Responsive breakpoints** for all devices
-  **Color-coded sections** for visual hierarchy

###  **News Section**
-  **Horizontal news slider** for better UX
-  **Navigation controls** (arrows & indicators)
-  **Touch-friendly** scroll on mobile

### **Responsive Design**
-  **Fully responsive** for smaller screens
-  **Mobile-first approach**
-  **Desktop-optimized** layouts

---

#  **Server Configuration**

###  **Server Settings**
-  **Runs on port:** `3000`
-  **Express.js** framework
-  **Static file serving** from `/public`

###  **Dependencies**
-  **All packages listed** in `package.json`
-  **Secure version locking** with `package-lock.json`
-  **Automatic updates** with semantic versioning

###  **Security**
-  **API keys stored** in `.env` file
-  **Never hardcoded** in source files
-  **Git ignored** for protection
-  **Timeout protection** (15s per request)

###  **Development Tools**
-  **Dotenv** for environment variables
-  **Axios** for HTTP requests
-  **Express** for routing

---

# **Author**
## **Altynay Yertay**
Software Engineering Student
Astana IT University