import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import ProfileList from './components/ProfileList/ProfileList';
import Filters from './components/Filters/Filters';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const profilesPerPage = 20;
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    paymentMethod: ''
  });
  const [isFetching, setIsFetching] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const fetchProfiles = async () => {
      setIsFetching(true);
      
      try {
          const { data } = await axios.get('https://api.enye.tech/v1/challenge/records');
          
          setProfiles(data.records.profiles);
          setTotalPages(Math.ceil(data.records.profiles.length / profilesPerPage));
      } catch (error) {
        if (error.response) {
          setErrMsg(error.response.message);
        } else {
          setErrMsg(error.message);
        }
      }

      setIsFetching(false);
  }

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  }

  const handleFilter = ({ target }) => {
    setFilters(prevState => {
      return {...prevState, [target.name]: target.value };
    })
  }

  const handlePageChange = (direction) => () => {
    let page = currentPage;

    if (direction === 'prev' && currentPage > 1) {
      page = page - 1;
    }
    
    if (direction === 'next' && currentPage < totalPages) {
      page = page + 1;
    }

    setCurrentPage(page);
    setOffset((page * profilesPerPage) - profilesPerPage);
  }

  // useEffect(() => {
  //   setOffset((currentPage * profilesPerPage) - profilesPerPage - 1);
  // }, [currentPage]);

  useEffect(() => {
    const filteredResult = profiles.filter(profile => {
      let isMatch = true;
      if (search) {
        const trimmedSearch = search.trim();

        isMatch = isMatch && 
          (profile.FirstName.toLowerCase().startsWith(trimmedSearch.toLocaleLowerCase()) || 
          profile.FirstName.toLowerCase().startsWith(trimmedSearch.toLocaleLowerCase()) ||
          `${profile.FirstName} ${profile.LastName}`.toLowerCase().startsWith(trimmedSearch.toLocaleLowerCase()) ||
          `${profile.LastName} ${profile.FirstName}`.toLowerCase().startsWith(trimmedSearch.toLocaleLowerCase()));
      }
        
      if (filters.gender) {
        isMatch =  isMatch &&  profile.Gender === filters.gender;
      }
      
      if (filters.paymentMethod) {
        isMatch =  isMatch &&  profile.PaymentMethod === filters.paymentMethod;
      }
      
      return isMatch;
    });

    setTotalPages(Math.ceil(filteredResult.length / profilesPerPage));
    setOffset(1);
    setCurrentPage(1);
    setFilteredProfiles(filteredResult);
  }, [search, filters, profiles]);

  useEffect(() => {
      fetchProfiles();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h4>ProfileApp</h4>
      </header>

      <main>
        <div>
            <div className='search-bar'>
              <input
                placeholder='Search first name'
                className='form-control'
                value={search}
                onChange={handleSearchChange} />
            </div>  
        </div>

        <div className='results'>
          <div className='filters'>
            <p>Filters</p>
  
            <Filters
              onGenderFilter={handleFilter}
              onPaymentMethodFilter={handleFilter}
            />
          </div>

          <div>
            {isFetching ? <Loader /> : <Fragment>
              {filteredProfiles.length ? <ProfileList profiles={filteredProfiles.slice(offset, profilesPerPage + offset)} /> : 
              (<p style={{ textAlign: 'center', background: '#fff', display: 'flex' }}>
                No Result Found
              </p>)}


              <div className='pagination'>
                <button className='pagination__control' onClick={handlePageChange('prev')}>{'<'}</button>
                <p>Page {currentPage} of {totalPages}</p>
                <button className='pagination__control' onClick={handlePageChange('next')}>{'>'}</button>
              </div>
            </Fragment>}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
