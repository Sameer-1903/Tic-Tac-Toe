import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Components/HomePage"
import PlayWithFriends from "./Components/PlayWithFriends"
import PlayWithComputer from "./Components/PlayWithComputer"
import PageNotFound from "./Components/PageNotFound"


function App() {


  return (

    <div>
      {/* <HomePage /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playwithfriend" element={<PlayWithFriends />} />
          <Route path="/playwithcomputer" element={<PlayWithComputer />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
