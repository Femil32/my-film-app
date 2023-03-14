import { createContext, useReducer } from "react";

export const SearchContext = createContext()

export const searchReducer = (state, action) => {
    switch (action.type) {
        case "CREW_DATA":
            return {
                ...state,
                crewListing: action.payload
            }
        case "TALENT_DATA":
            return {
                ...state,
                talentListing: action.payload
            }
        case "SERVICES_DATA":
            return {
                ...state,
                servicesListing: action.payload
            }
        case "LOCATIONS_DATA":
            return {
                ...state,
                locationsListing: action.payload
            }
        case "CURRENT_PROFILE":
            return {
                ...state,
                currentProfile: action.payload
            }
        case "BOOKNOW_MODEL":
            return {
                ...state,
                bookNowModel: action.payload
            }
        case "OTHER_CREW_DATA":
            return {
                ...state,
                otherCrewListing: action.payload
            }
        case "OTHER_TALENT_DATA":
            return {
                ...state,
                otherTalentListing: action.payload
            }
        case "OTHER_SERVICES_DATA":
            return {
                ...state,
                otherServicesListing: action.payload
            }
        case "OTHER_LOCATIONS_DATA":
            return {
                ...state,
                otherLocationsListing: action.payload
            }

        default:
            return state
    }
}


export const SearchContextProvider = ({ children }) => {
    const [state, dispatchSearch] = useReducer(searchReducer, {
        crewListing: [],
        talentListing: [],
        servicesListing: [],
        locationsListing: [],
        currentTab: {
            "id": 2,
            "name": "crew"
        },
        currentProfile: null,
        bookNowModel: false,
        otherCrewListing: [],
        otherTalentListing: [],
        otherServicesListing: [],
        otherLocationsListing: [],
    })

    return (
        <SearchContext.Provider value={{ ...state, dispatchSearch }}>
            {children}
        </SearchContext.Provider>
    )
}