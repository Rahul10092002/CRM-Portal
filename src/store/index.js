import { configureStore } from "@reduxjs/toolkit"
import leadsReducer from "./slices/leadsSlice"
import projectsReducer from "./slices/projectsSlice"
import usersReducer from "./slices/usersSlice"
import documentsReducer from "./slices/documentsSlice"
import siteVisitsReducer from "./slices/siteVisitsSlice"

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    projects: projectsReducer,
    users: usersReducer,
    documents: documentsReducer,
    siteVisits: siteVisitsReducer,
  },
})
