import React, { useState, useEffect } from "react"
import DataTable, { createTheme } from "react-data-table-component"

createTheme("itemsTable", {
    divider: {
        default: '#EFF6FF',
    },
    striped: {
        default: '#EFF6FF',
        text: 'rgba(0, 0, 0, 0.87)',
    }
})

const customStyles = {
    headRow: {
        style: {
            borderBottomColor: "#3B82F6",
            borderBottomWidth: "1.5px"
        }
    },
    headCells: {
        style: {
            fontSize: "15px"
        }
    },
    rows: {
        style: {
            '&:not(:last-of-type)': {
                borderBottomWidth: '0px',
            },
        }
    }
}

const TableCard = ({title, columns, data, filter, sort}) => {
    const [option, setOption] = useState(filter.options[0])
    const [rawTableData, setRawTableData] = useState(data)
    const [showTableData, setShowTableData] = useState(null)

    useEffect(() => {
        console.log('changing showtabledata')
        if (option === "All Items") setShowTableData([...rawTableData])
        else {
            let newShowTableData = rawTableData.filter(row => row.type === option.toLowerCase())
            setShowTableData(newShowTableData)
        }
    }, [rawTableData, option])

    const handleSort = (column, sortDirection) => {
        let newRawTableData = [...rawTableData]
        if (sort.text.includes(column.selector)) {
            // Text column
            if (sortDirection === "asc") newRawTableData.sort((row1, row2) => (row1[column.selector] > row2[column.selector]) ? 1 : -1)
            else newRawTableData.sort((row1, row2) => (row1[column.selector] < row2[column.selector]) ? 1 : -1)
        } else if (sort.number.includes(column.selector)) {
            // Number column
            if (sortDirection === "asc") newRawTableData.sort((row1, row2) => (row1[column.selector] - row2[column.selector]))
            else newRawTableData.sort((row1, row2) => (row2[column.selector] - row1[column.selector]))
        } else {
            // Currency column
            if (sortDirection === "asc") newRawTableData.sort((row1, row2) => (parseFloat(row1[column.selector].substring(1)) - parseFloat(row2[column.selector].substring(1))))
            else newRawTableData.sort((row1, row2) => (parseFloat(row2[column.selector].substring(1)) - parseFloat(row1[column.selector].substring(1))))
        }
        setRawTableData(newRawTableData)
        console.log(column)
        console.log(sortDirection)
        console.log(JSON.stringify(newRawTableData.slice(0,2)))
    }

    if (!showTableData) return <p>Loading...</p>

    return (
        <>
            <div className="grid sm:grid-cols-4 lg:grid-cols-6">
                <div className="sm:col-span-3 lg:col-span-5">
                    <p className="inline pl-2 mb-4 text-left border-l-4 border-blue-500">{title}</p>
                </div>
                <div className="sm:col-span-1 lg:col-span-1">
                    <select
                        className="min-w-full border-2 border-blue-200 hover:border-blue-500 rounded py-2 pl-2 mb-4 cursor-pointer"
                        onChange={(e) => setOption(e.target.value)}
                    >
                        { filter.options.map(tableOption => (
                            <option value={tableOption} key={tableOption}>{tableOption}</option>
                        ))}
                    </select>
                </div>
            </div>
            <DataTable
                columns={columns} data={showTableData}
                noHeader={true} pagination={true} striped={true}
                theme="itemsTable" customStyles={customStyles}
                sortServer={true} onSort={handleSort}
            />
        </>
    )
}

export default TableCard
