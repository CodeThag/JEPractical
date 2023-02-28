import { Box, Pagination, Typography } from '@mui/material';
import React from 'react'
import { PaginationProps } from '../models/pagination';

interface Props {
    paginationData: PaginationProps;
    onPageChange: (page: number) => void;
}

const CustomPagination = ({ paginationData, onPageChange }: Props) => {

    const { pageNumber, totalCount, totalPages } = paginationData;
    const pageSize = 10;

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(pageNumber - 1) * pageSize + 1} -
                {pageNumber * pageSize > totalCount
                    ? totalCount
                    : pageNumber * pageSize} of {totalCount} items
            </Typography>
            <Pagination color='secondary' size='large'
                count={totalPages}
                page={pageNumber}
                onChange={(e, page) => onPageChange(page)} />
        </Box>
    )
}

export default CustomPagination;