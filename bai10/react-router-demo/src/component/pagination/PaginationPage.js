import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function PaginationPage(props) {

  // pagination use react hook  
  const handleChange = (event, value) => {
    // value là số thứ tự trang muốn tới
    props.sendPageNumber(value) // 

  };

  return (
    <div className="pagination_page">
      <Stack spacing={2}>
        <Pagination
          count={props.totalPage} // tổng trang
          onChange={handleChange}
          page={props.currentPage} // số trang đang đứng , nhận từ component cha 
          variant="outlined"
          color="secondary"
          showFirstButton
          showLastButton />
      </Stack>
    </div>
  );
}
