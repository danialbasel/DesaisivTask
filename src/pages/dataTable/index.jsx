import { useState, useMemo, useEffect } from 'react';
import Styles from './dataTable.module.css';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import TableService from '../../services/table';
import { Button } from '@mui/material';

const DataTable = () => {
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


    const loadMoreData = async () => {
        const params = {
            size: 10
        };
        const moreData = await TableService.LoadMore(params);
        setData(() => [...data, ...moreData])
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
        <div className={Styles.tableWrapper} >
            <Table
                {...{
                    data,
                    columns,
                }}
            />
            <hr />
            <div>
                <Button onClick={() => loadMoreData()} variant="contained">Load More Data</Button>
            </div>
        </div>
    )
}



const Table = ({
    data,
    columns,
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

    const handlePageSizeChange = (e) => {
        const target = Number(e.target.value);
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
            <div className={Styles.height2} />
            <div className={Styles.buttonsGroup}>
                <button
                    className={Styles.buttons}
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className={Styles.buttons}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className={Styles.buttons}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className={Styles.buttons}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className={Styles.pageGroup} >
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className={Styles.pageGroup}>
                    | Go to page:
                    <input
                        type="number"
                        min='1'
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className={Styles.pageInput}
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