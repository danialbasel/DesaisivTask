import { useState, useMemo, useReducer, useEffect } from 'react';
import './dataTable.module.css'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import TableService from '../../services/table';


const DataTable = () => {
    const rerender = useReducer(() => ({}), {})[1]

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: 'first_name',
                        cell: info => info.getValue(),
                        header: () => <span>First Name</span>,
                        footer: props => props.column.id,
                    },
                    {
                        accessorFn: row => row.last_name,
                        id: 'last_name',
                        cell: info => info.getValue(),
                        header: () => <span>Last Name</span>,
                        footer: props => props.column.id,
                    },
                ],
            },
            {
                header: 'Info',
                footer: props => props.column.id,
                columns: [
                    {
                        accessorKey: 'address',
                        header: () => 'Address',
                        cell: info => `${info.getValue().city} ${info.getValue().country}`,
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: 'username',
                        header: () => 'Username',
                        cell: info => info.getValue(),
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: 'email',
                        header: () => 'Email',
                        cell: info => info.getValue(),
                        footer: props => props.column.id,
                    },
                    {
                        accessorKey: 'social_insurance_number',
                        header: () => 'SIN',
                        cell: info => info.getValue(),
                        footer: props => props.column.id,
                    },
                ],
            },
        ],
        []
    )
    const [data, setData] = useState(() => [])


    const refreshData = async () => {
        const rows = [...(await TableService.GetRows())];
        setData(() => [...rows])
    }
    useEffect(() => {
        const params = {
            size: 10
        };
        TableService.GetRows(params).then(rows => {
            setData(() => [...rows]);
        })
    }, [])
    return (
        <>
            <Table
                {...{
                    data,
                    columns,
                    setData
                }}
            />
            <hr />
            <div>
                <button onClick={() => rerender()}>Force Rerender</button>
            </div>
            <div>
                <button onClick={() => refreshData()}>Refresh Data</button>
            </div>
        </>
    )
}



const Table = ({
    data,
    columns,
    setData,
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    })
    useEffect(() => table.setPageCount(10), [])

    const handlePageSizeChange = async (e) => {
        const target = Number(e.target.value);
        const currentPage = table.getState().pagination.pageIndex + 1;
        const currentPageSize = table.getState().pagination.pageSize;
        const sizeDiff = e.target.value - currentPageSize;
        if (sizeDiff > 0 && data?.length < (target * currentPage) && (target * currentPage) <= 100) {
            const size = Math.min(sizeDiff * currentPage, 90);
            const params = {
                size
            };
            const moreData = await TableService.LoadMore(params);
            setData([...data, ...moreData]);
        }
        table.setPageSize(target)
    }
    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanFilter() ? (
                                                    <div>
                                                        <Filter column={header.column} table={table} />
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        min='1'
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={handlePageSizeChange}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
        </div>
    )
}
function Filter({
    column,
    table,
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue)?.[0] ?? ''}
                onChange={e =>
                    column.setFilterValue((old) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue)?.[1] ?? ''}
                onChange={e =>
                    column.setFilterValue((old) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <input
            type="text"
            value={(columnFilterValue ?? '')}
            onChange={e => column.setFilterValue(e.target.value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded"
        />
    )
}

export default DataTable;