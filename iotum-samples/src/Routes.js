import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from './pages/Menu/Menu.js'

export const Routers = () => {
    console.log("routes")
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Menu />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}