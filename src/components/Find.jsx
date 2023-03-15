import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleFind, resetAllFilters} from 'redux/slices';
import NotInterestedIcon from '@mui/icons-material/NotInterested';


export const Find = () => {
  const [searchWord, setSearchWord] = useState('');



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAllFilters());
    dispatch(handleFind(searchWord));
  }, [searchWord, dispatch]);

  return (
    <div className="find_wrapper">
      {/* <div className="find"> */}
        <input
          className="find_input"
          type="text"
          value={searchWord}
          onChange={e => {
            setSearchWord(e.target.value);
          }}
          placeholder="Знайти товар..."
        />
        
      </div>
    // </div>
  );
};
