export const dataReducer = (state, action) => {
    switch (action.type) {
        case "IMPORT_DATA":
            return {...state,
                [action.name]: action.data
            }
    }
}
