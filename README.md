# Stock Watch List Lite

Welcome to the **Stock Watch List Lite** project! This is a simple tool designed to help you track and monitor stock market data.

---
<br><br>

# Tech Stack

- **Frontend:** React.js (Vite)

- **Styling:** TailwindCSS

- **Charting:** Chart.js, react-chartjs-2, chartjs-adapter-date-fns

- **Icons:** Lucide React

- **Notifications:** react-hot-toast

- **State Management:** React Hooks (useState, useEffect, useRef)

- **Testing:** Jest

- **Deployment:** Vercel

<br><br>


# How to Run the Project

Follow these steps to set up and run the project on your system:

### 1. Install Dependencies

Navigate to your project directory and run:

```
npm install
```

<img src="screenshots/npmIimage.png" 
     alt="npm install Screenshot" 
     width="500" 
     style="border: 3px solid #8DCF29; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(141,207,41,0.4); padding: 10px;" />

### 2. Start the Development Server

Once dependencies are installed, start the app in development mode:

```
npm run dev
```

Open your browser and visit: http://localhost:5173

<img src="screenshots/npmrundevimage.png" 
     alt="npm run dev Screenshot" 
     width="500" 
     style="border: 3px solid #8DCF29; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(141,207,41,0.4); padding: 10px;" />

### 3. Run Tests

To run the project tests using Jest:

```
npm run test
```

<img src="screenshots/npmTest.png" 
     alt="npm test Screenshot" 
     width="500" 
     style="border: 3px solid #8DCF29; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(141,207,41,0.4); padding: 10px;" />

<br><br>

# Clarifying Questions & Assumptions

 ### 1. Should the data be completely static or should we simulate `random updates` every few seconds?

 ### 2. Do we need to support multiple themes like `dark mode` and `light mode`?

 ### 3. Should the `chart` in the details drawer be interactive or just a `static view`?

 ### 4. Is it okay to use `libraries` like `Chart.js` for the chart, or should we build it from scratch?

 ### 5. Do you want `animations` when `toggling` between `View A` and `View B`?

<br><br>

# Implemented Features

- ### Display `6 stock cards` per row on desktop and wrap on smaller screens
- ### Show stock details like `Trading Symbol`, `Capital Market Price`, `Futures Price`, `Percentage Change`, and `last updated time`
- ### `Toggle` between two views for `price comparison`
- ### `Search bar` to filter by Trading Symbol
- ### `Sort` options by `percentage change`, `capital market price`, and `futures price`
- ### Open `details drawer` with a `dummy chart`using `random` data and stock information
- ### Show `error state` when data is `missing`
- ### `Refresh` button to `reload data`
- ### Show `loading skeletons` when data is being `fetched`
- ### `Retry` option if an `error occurs`
- ### `Unit tests` for main functionalities

<br><br>

# Tradeoffs and Next Steps

- ### The chart uses `random data` instead of real market data

- ### `Error simulation` is random and may not cover all possible edge cases

- ### The UI could be improved with more `animations` and `transitions`

- ### Adding real `API` integration would make the app more `useful`

<br><br>
# Originality & Problem-solving

In this project, I `carefully thought` about how users would interact with a `stock watchlist app`. I built the app with my `own structure` and `logic`.

- ## Some problem-solving steps I took:

    - ### I used dummy data and simulated data fetching using `setTimeout` to create a real-like experience without using an `API`.
    - ### I implemented `error handling`, so if the data is missing or a fetch fails, the app shows a `user-friendly message` instead of crashing.
    - ### I structured the code with reusable components like `StockCard`, `ErrorState`, and `FilterDrawer`, `More` so it is clean and easy to manage.
    - ### I wrote `unit tests` using `Jest` and React `Testing Library` to check that the main functionalities work as expected.
    - ### I used `styling`, and `transitions` to make the interface smooth and intuitive.

    ## These steps helped me solve challenges like handling missing data, improving responsiveness, and making the app user-friendly.

<br><br>


# 🌐 Deployment

### This project is deployed on Vercel. You can view the live project here:  
## [Stock Watch List Lite](https://stock-watch-list.vercel.app/)🌐

<br><br>

# Notes

- ### Beginner-friendly and perfect for understanding `React`, `Tailwind CSS`, and basic `stock tracking` applications.
- ### Designed as a `Lite version`, expandable to a full-featured `stock watch app`.


<br><br><br>
# 📸 Screenshots

# Desktop and Laptop View

 - ### `Home Page View `                               
     <img src="screenshots/desktop/HomePage.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" /> 
 - ### `Error Fetch View`                  
     <img src="screenshots/desktop/ErrorFetch.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />
 

 - ### `Grid View` 
     <img src="screenshots/desktop/GridView.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />                               
 - ### `List View ` 
     <img src="screenshots/desktop/ListView.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />                       
  
 

 - ### `Search View `
     <img src="screenshots/desktop/Search.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />                             
 - ### `Search Not Found View`  
     <img src="screenshots/desktop/SearchNotFound.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />            
  
 

 - ### `Details Drawer View` 
     <img src="screenshots/desktop/DetailsDrawer.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />                     
 - ### `Missing Data Drawer View` 
     <img src="screenshots/desktop/ErrorData.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />         
  
 

 - ### `Filter Drawer View ` 
     <img src="screenshots/desktop/FilterDrawer.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />                     
 - ### `Card Toggle View ` 
     <img src="screenshots/desktop/CardToggle.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />    
 - ### `Card Skeleton View`
    <img src="screenshots/desktop/SkeletonCard.png" 
     alt="npm test Screenshot" 
     width="90%" 
     style="border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0px 0px 10px 8px rgba(24, 201,242,0.4); padding: 10px;" />            
  
 <br><br>

# 📱 Mobile Responsive View

| ### `Home Page View` | ### `Error Fetch View` | ### `Grid View` |
|---|---|---|
| <img src="screenshots/mobile/mobileHome.jpg" alt="Home Page Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileDataFetch.jpg" alt="Error Fetch Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileGridView.jpg" alt="Grid View Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> |

| ### `List View` | ### `Search View` | ### `Search Not Found View` |
|---|---|---|
| <img src="screenshots/mobile/mobilelistView.jpg" alt="List View Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileSearch.jpg" alt="Search Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileSearchNotFound.jpg" alt="Search Not Found Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> |

| ### `Details Drawer View` | ### `Missing Data Drawer View` | ### `Filter Drawer View` |
|---|---|---|
| <img src="screenshots/mobile/mobileDetailed.jpg" alt="Details Drawer Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileMissing.jpg" alt="Missing Data Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileFilter.jpg" alt="Filter Drawer Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> |

| ### `Card Toggle View` | ### `Card Skeleton View` |   |
|---|---|---|
| <img src="screenshots/mobile/mobileCardToggle.jpg" alt="Card Toggle Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> | <img src="screenshots/mobile/mobileSkeletonCard.jpg" alt="Card Skeleton Screenshot" width="250" height="450" style="margin: 10px; border: 3px solid #18C9F2; border-radius: 10px; box-shadow: 0 0 10px 8px rgba(24,201,242,0.4); padding: 10px;" /> |   |

