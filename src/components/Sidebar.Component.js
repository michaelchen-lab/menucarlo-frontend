import React from "react"
import Loader from 'react-loader-spinner'

const Sidebar = ({name, allPeriods, currentPeriod, setPeriod, currentOption, setOption, isLoading}) => {

    if (!allPeriods || !currentPeriod || !currentOption) return (<h1></h1>)

    const base_menu_css = "appearance-none min-w-full py-2 pl-2 font-medium"
    return (
        <div className="px-4 pb-2">

            <h1 className="text-lg font-semibold text-black text-center pb-2">{name}</h1>
            <select
                className="min-w-full border-2 border-blue-300 hover:border-blue-500 rounded py-2 pl-2 mb-4 cursor-pointer"
                onChange={(e) => setPeriod(e.target.value)} value={currentPeriod}
            >
                { allPeriods.map(period => (
                    <option value={period} key={period}>{period}</option>
                ))}
            </select>

            {(currentOption === 'analytics') ? (
                <button className={base_menu_css+" bg-blue-100 text-blue-700"} disabled>Analytics</button>
            ) : (
                <button
                    className={base_menu_css+" hover:text-blue-700 focus:outline-none"}
                    onClick={(e) => setOption(e.target.value)} value='analytics'
                >Analytics</button>
            )}

            {(currentOption === 'simulations') ? (
                <button className={base_menu_css+" bg-blue-100 text-blue-700"} disabled>Simulations</button>
            ) : (
                <button
                    className={base_menu_css+" hover:text-blue-700 focus:outline-none"}
                    onClick={(e) => setOption(e.target.value)} value='simulations'
                >Simulations</button>
            )}

            {isLoading && (
                <div className="px-2 py-2">
                    <Loader type="TailSpin" color="rgba(59, 130, 246)" height={50} width={50} />
                </div>
            )}

        </div>
    )
}

export default Sidebar
