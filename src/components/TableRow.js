import React, {useEffect, useState} from "react";
import { useTable, useSortBy } from 'react-table';




function TableRow ({ data })  {
  /*
   * This component creates a sortable table from the used data.
   *
   * Table is from react-table library and has almost everything built-in.
   */
    const columns = React.useMemo(
        () => [ 
          {
            Header: "Date",
            accessor: 'Date', // accessor is the "key" in the data 
            sortType: 'basic',
          }, 
          { 
            Header: 'Close/Last', 
            accessor: 'Close/Last',
          },
          {  
            Header: 'Volume',  
            accessor: 'Volume',  
            sortType: 'basic' ,
 
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