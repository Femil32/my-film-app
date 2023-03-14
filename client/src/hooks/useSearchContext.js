import { useContext } from "react"
import { SearchContext } from "../pages/search/SearchContext"


export const useSearchContext = () => {
    const context = useContext(SearchContext)

    if (!context) {
        throw Error("Must be used inside SearchContextProvider")
    }

    return context
}