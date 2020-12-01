import React from "react"

const Sidebar = ({name, allPeriods, setPeriod, menu, setMenu}) => {

    const changeFocus = (itemName) => {
        let newMenu = [...menu]
        for (let item of newMenu) {
            if (item.name === itemName) item.inFocus = true
            else item.inFocus = false
        }
        setMenu(newMenu)
    }

    const base_menu_css = "appearance-none min-w-full py-2 pl-2 font-medium"
    // <p className="pb-4 text-3xl font-bold text-center">Dashboard</p>
    return (
        <div className="px-4">


            <select
                className="min-w-full border rounded py-2 pl-2 mb-4 focus:border-blue-700"
                onChange={(e) => setPeriod(e.target.value)}
            >
                { allPeriods.map(period => (
                    <option value={period} key={period}>{period}</option>
                ))}
            </select>

            { menu.map(item => {
                if (item.inFocus === true) {
                    return <button key={item.name} className={base_menu_css+" bg-blue-100 text-blue-700"} disabled>{item.name}</button>
                } else if (item.disabled === true) {
                    return <button key={item.name} className={base_menu_css+" text-gray-500"} disabled>{item.name}</button>
                } else {
                    return <button
                        key={item.name} value={item.name}
                        className={base_menu_css+" hover:text-blue-700 focus:outline-none"}
                        onClick={(e) => changeFocus(e.target.value)}
                    >{item.name}</button>
                }
            }) }

        </div>
    )
}

export default Sidebar
