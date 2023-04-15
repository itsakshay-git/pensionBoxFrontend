import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Search from "../search/Search";
import "./orderTable.scss";
import axios from 'axios';



const Ordertable = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [limit,setLimit]=useState(10);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();
  // const keys = ["first_name", "last_name", "email"];

  //   const searchData = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(search))
  //   );
  // };
    
    useEffect(() => {
        currentPage.current=1;
        getPaginatedUsers();
        // eslint-disable-next-line
    }, []);

    function handlePageClick(e){
        console.log(e);
        currentPage.current=e.selected+1;
        getPaginatedUsers();
    }

    const getPaginatedUsers = async () => {
      
      const response = await axios.get(`https://pensionbox-api.onrender.com/api/users/paginatedUsers?page=${currentPage.current}&limit=${limit}`);
      console.log(response)
        setPageCount(response.data.pageCount);
        setData(response.data.result)
      }

  return (
    <div className="product-list">
      <div className="table">
      <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Orders</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </span>
        </div>
    <table>
    <thead>
      <tr>
            <th>orderId</th>
            <th>vendorName</th>
            <th>pickupDate</th>
            <th>status</th>
      </tr>
    </thead>

    <tbody>
      {data.filter((item) => {
        return search.toLowerCase() === "" ? item : 
        item.orderId.toLowerCase().includes(search) || 
        item.vendorName.toLowerCase().includes(search) ||
        item.pickupDate.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
      }).map((item, index) => {
        return (
          <tr key={item.orderId}>
            <td>{item.orderId}</td>
            <td>{item.vendorName}</td>
            <td>{item.pickupDate}</td>
            <td>{item.status}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
    </div>
  )
}

export default Ordertable;