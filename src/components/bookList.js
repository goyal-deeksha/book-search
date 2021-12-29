import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../styles/bookList.css';
import { fetchBookDetails } from '../actions/bookActions';

export const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('');
  const [columns, setColumns] = useState(['title', 'cover', 'author', 'publishDate']);
  const [checkedColumns, setCheckedColumns] = useState(['title', 'cover', 'author', 'publishDate']);
  const [src, setSrc] = useState(null);

  const dispatch = useDispatch();
  const { books, loading } = useSelector(store => store.books)

  useEffect(() => {
    if (books) {
      setBookList([...books]);
    }
  }, [books])

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    dispatch(fetchBookDetails(searchText));
    setSortField('')
  }

  const sortData = (e) => {
    const field = e.target.value;
    setSortField(field);
    let books = [];
    if (field === 'publishDate') {
      const bs = [];
      bookList.forEach((b) => {
        if (b.publishDate !== '') {
          books.push(b)
        } else {
          bs.push(b);
        }
      })
      books = books.concat(bs);
      books = books.sort((a, b) => {
        if(new Date(a[field]) > new Date(b[field])) {
          return -1;
        } else {
          return 1;
        }
      });
      setBookList([...books]);
    } else if (field === '') {
      setBookList([...bookList])
    } else {
      sortByTitle(field);
    }
  }

  const sortByTitle = (field) => {
    let arr = field.split(' ');
    const ord = arr[1];
    const t = arr[0];
    let books = [];
    if (ord === 'asc' && t !== '') {
      books = bookList.sort((a, b) => {
        if(a[t] < b[t]) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (field !== '') {
      books = bookList.sort((a, b) => {
        if(a[t] > b[t]) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    setBookList([...books]);
  }

  const onDragEnd = (e, dest) => {
    // Swapping Columns
    const colArr = [...columns];
    const tmp = colArr[src];
    colArr[src] = colArr[dest];
    colArr[dest] = tmp;
    setColumns([...colArr]);
  }

  const onColumnListChange = (col) => {
    const checkedArr = [...checkedColumns];
    if (checkedArr.includes(col)) {
      checkedArr.splice(checkedArr.indexOf(col), 1);
    } else {
      checkedArr.push(col);
    }
    setCheckedColumns([...checkedArr]);
  }

  return (
    <div className={'table-wrapper'}>
      <main>
        <div className={'search-container'}>
          <div className={'search'}>
            <input
              type={'text'}
              name={'searchBox'}
              value={searchText}
              onChange={handleChange}
              className={'search-field'}
              placeholder={'Search Book e.g. Gatsby'}
              onKeyPress={onEnter}
            />
            <button className={'search-btn'} onClick={handleSearch}>Search</button>
          </div>
          <div className={'sort'}>
            <span>Sort By</span>
            <select className={'select'} onChange={sortData} value={sortField}>
              <option value={''}>Select</option>
              <option value={'publishDate'}>Most Recent</option>
              <option value={'title asc'}>Title (asc)</option>
              <option value={'title desc'}>Title (desc)</option>
            </select>
          </div>
        </div>
        <div>
          <ul>
            {
                columns.map((c, idx) => {
                  return (
                    <li
                      key={c}
                    >
                      <div className={'head-wrapper'}>
                        <span>
                          <input
                            type={'checkbox'}
                            value={c}
                            checked={checkedColumns.includes(c)}
                            onChange={() => onColumnListChange(c)}
                          />
                        </span>
                        <span>{c}</span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
        </div>
        <table>
          <thead>
          <tr>
            {
              columns.map((c, idx) => {
                if (checkedColumns.includes(c) )
                return (
                  <th
                    draggable
                    onDragStart={() => { setSrc(idx) }}
                    onDragOver={(e) => e.preventDefault()}
                    key={c}
                    onDrop={(e) => onDragEnd(e, idx)}
                  >
                    <div className={'head-wrapper'}>
                      <span>{c}</span>
                    </div>
                  </th>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            loading ? (
              <tr>
                <td colSpan={4} className={'text-center'}>
                  <CircularProgress size={40}/>
                </td>
              </tr>
            ) : (
              <>
                {
                  bookList?.map((book, idx) => {
                    return (
                      <tr key={idx}>
                        {checkedColumns.includes(columns[0]) && <td data-label="Title :">{book[columns[0]]}</td>}
                        {checkedColumns.includes(columns[1]) && <td data-label="Cover :">
                          <img src={`http://covers.openlibrary.org/b/id/${book[columns[1]]}-S.jpg`} alt='cover' />
                          </td>
                        }
                        {checkedColumns.includes(columns[2]) && <td data-label="Author :">{book[columns[2]]}</td>}
                        {checkedColumns.includes(columns[3]) && <td data-label="Published Date :">{book[columns[3]]}</td>}
                      </tr>
                    )
                  })
                }
              </>
            )
          }

          </tbody>
        </table>

      </main>
    </div>
  )
}

// export default BookList;