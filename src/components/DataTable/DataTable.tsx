import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper
} from '@material-ui/core';

import { SortOrder, getComparator, stableSort } from './sort';
import cx from 'classnames';
import { Loader } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      width: '100%',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    label: {
      whiteSpace: (props: any) => {
        return props.isSinglelineHeader ? 'nowrap' : 'initial';
      },
    },
    sortIcon: {
      marginLeft: 4,
      display: 'flex',
      alignItems: 'center'
    },
    headCellLabel: {
      cursor: 'default',
      color: theme.palette.text.secondary,
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      '& svg': {
        marginLeft: 3,
        width: 16,
        '& path': {
          fill: theme.palette.text.secondary
        }  
      },
    },
    sortRequestedHeadLabel: {
      color: theme.palette.primary.main,
      '& svg path': {
        fill: theme.palette.primary.main
      }
    },
    sortRequestedIcon: {
      '& svg path': {
        stroke: theme.palette.primary.main
      }
    },
  }),
);
export interface HeadCell<T> {
  id: string;
  label: React.ReactNode | string;
  numeric: boolean;
  sortDisabled?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
  element?: React.ReactNode;
  sortKey: (optionBalance: T) => string | number;
}

export interface DataTableProps<T> {
  headCells: HeadCell<T>[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  toolbar?: React.ReactNode;
  caption?: React.ReactNode;
  defaultOrderBy?: T;
  defaultOrder?: 'asc' | 'desc';
  loading?: boolean;
  isSinglelineHeader?: boolean;
  onChange?: Function;
  size?: number;
  rowPerPage?: number;
  sortUpIcon?: React.ReactNode;
  sortDownIcon?: React.ReactNode;
}

const DataTable: React.FC<DataTableProps<any>> = ({
  headCells,
  data,
  renderRow,
  toolbar,
  sortUpIcon,
  sortDownIcon,
  caption,
  defaultOrderBy = headCells[0],
  defaultOrder = 'asc',
  loading = false,
  isSinglelineHeader = false,
  onChange = () => {},
  size = 0,
  rowPerPage = 10,
}) => {
  const classes = useStyles({ isSinglelineHeader });
  const [order, setOrder] = useState<SortOrder>(defaultOrder);
  const [orderBy, setOrderBy] = useState<HeadCell<any>>(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
  const count = size || data.length;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: HeadCell<any>,
  ) => {
    const isAsc = orderBy.id === property.id && order === 'asc';
    setOrder(isAsc && !property.sortDisabled ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if ((newPage + 1) * rowsPerPage >= size) onChange(false);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onChange(true);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <Box clone borderRadius={16}>
      <Paper className={classes.paper}>
        {toolbar}

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <TableCell
                    key={`${headCell.id}_${index}`}
                    align={headCell.align}
                    padding='default'
                    sortDirection={orderBy.id === headCell.id ? order : false}
                  >
                    {headCell.element}
                    {
                      sortUpIcon && sortDownIcon ?
                        <Grid container alignItems='center' className={classes.label}
                        onClick={(event: any) =>
                          handleRequestSort(event, headCell)
                        }>
                          <Box className={cx(classes.headCellLabel, orderBy.id === headCell.id && classes.sortRequestedHeadLabel)}>{headCell.label}</Box>
                          {
                            !headCell.sortDisabled &&
                            <Box className={cx(classes.sortIcon, orderBy.id === headCell.id && classes.sortRequestedIcon)}>{order === 'asc' && orderBy.id === headCell.id ? sortUpIcon : sortDownIcon}</Box>
                          }
                        </Grid>
                      :
                      <TableSortLabel
                        className={classes.label}
                        active={orderBy.id === headCell.id}
                        direction={orderBy.id === headCell.id ? order : 'asc'}
                        onClick={(event: any) =>
                          handleRequestSort(event, headCell)
                        }
                      >
                        {headCell.label}
                        {orderBy.id === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    }
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length}>
                    <Grid container justify='center' alignItems='center'>
                      <Loader />
                    </Grid>
                  </TableCell>
                </TableRow>
              )}

              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(renderRow)}

              {!loading && data.length < 1 && (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={headCells.length} align='center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}

              {!loading && emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * (data.length < 1 ? emptyRows - 1 : emptyRows),
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
            </TableBody>

            {/* Todo: show captions */}
            {caption === false && (
              <caption style={{ marginTop: 24 }}>{caption}</caption>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
