import React from "react";
import { useTable, useSortBy } from 'react-table';




/*

This component creates a sortable table from the data that is being wanted.

Table is from react-table library and has almost everything built-in.

It is also lightweight.

*/
function TableRow ({ data })  {
    const columns = React.useMemo(
        () => [ 
          {
            Header: "Date", // header from the data.
            accessor: 'Date', // accessor is the "key" in the data 
            sortType: (a, b) => { //had to implement custom sorting because of possible year changes.
              var a1 = new Date(a).getTime();
              var b1 = new Date(b).getTime();
            if(a1<b1)
            return 1;
            else if(a1>b1)
            return -1;
            else
            return 0;
            }
          }, 
          { 
            Header: 'Close/Last', 
            accessor: 'Close/Last',
          },
          {  
            Header: 'Volume',  
            accessor: 'Volume',  
            sortType: 'basic' , //this sorting type based on purely numbers. (a1 > b1) etc.
                                //on others it is "alphanumeric" by default which handles
                                //the strings or other character i.e. ($) so it doesn't bother the sort.
          },  
          {   
            Header: 'Open', 
            accessor: 'Open',
          },
          {   
            Header: 'High',  
            accessor: 'High',   
          },
          {  
            Header: 'Low' ,
            accessor: 'Low',   
          },
          {  
            Header: 'SMA 5' ,
            accessor: 'SMA 5',   
          },
          {  
            Header: 'Price Change' ,
            accessor: 'Price Change',   
            sortType: 'basic' ,

          },
        ], 
        []  
      )
      return (
          <Table columns={columns} data={data} />
      )
    }


/*

Function to create and return the react-table.

*/
function Table ({data, columns}){
    const {
        getTableProps,  
        getTableBodyProps,  
        headerGroups,  
        rows,  
        prepareRow,  
      } = useTable({ columns, data,
      }, useSortBy)

      return (  
        <table {...getTableProps()}>  
          <thead>  
            {headerGroups.map(headerGroup => (   
              <tr {...headerGroup.getHeaderGroupProps()}> 
                {headerGroup.headers.map(column => (  
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}  
              </tr>  
            ))}  
            </thead>  
            <tbody {...getTableBodyProps()}>  
              {rows.map(row => {   
                prepareRow(row)   
                return (
                  <tr {...row.getRowProps()}>  
                    {row.cells.map(cell => {   
                    return (   
                      <td   
                        {...cell.getCellProps()}  
                      >
                        {cell.render('Cell')}
                       </td> 
                    )  
                  })}  
                </tr>  
              )   
            })} 
          </tbody>  
        </table>  
    )  
  }
    
export default TableRow;