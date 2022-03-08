import {Header} from "./components/Header";
import {AppRouter} from "./router/AppRouter";
import  "./css/main.css"

export const App = () => {
    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    )
}
