import { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    InputBase,
    Paper
} from '@mui/material';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

import TableService from '../../services/table';
import TablePaginationActions from './actions';

import Styles from './dataTable.module.css';

const DataTable = () => {
    const loaderData = useLoaderData()
    const [data, setData] = useState(() => [...loaderData])

    const AdrressFilter = (row, columnId, value) => {
        const rowVale = `${row.getValue(columnId).city} ${row.getValue(columnId).country}`
        return rowVale.toLowerCase().includes(value.toLowerCase())
    }

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
                        filterFn: AdrressFilter
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

    const loadMoreData = async () => {
        const params = {
            size: 10
        };
        const moreData = await TableService.LoadMore(params);
        setData(() => [...data, ...moreData])
    }

    return (
        <div className={Styles.tableWrapper} >
            <TableDetails
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

const TableDetails = ({
    data,
    columns,
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const { pageSize, pageIndex } = table.getState().pagination

    return (
        <Box sx={{ width: '70%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableCell key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <Filter column={header.column} />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
                component="div"
                count={table.getFilteredRowModel().rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onPageChange={(_, page) => {
                    table.setPageIndex(page)
                }}
                onRowsPerPageChange={e => {
                    const size = e.target.value ? Number(e.target.value) : 10
                    table.setPageSize(size)
                }}
                ActionsComponent={TablePaginationActions}
            />
        </Box>
    )
}
function Filter({
    column,
}) {
    const columnFilterValue = column.getFilterValue()

    return <InputBase
        value={(columnFilterValue ?? '')}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className={Styles.filerInput}
        inputProps={{ 'aria-label': 'search' }}
    />

}

export default DataTable;