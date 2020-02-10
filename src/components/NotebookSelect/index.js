import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  getAllSearchNotebooksIds,
  getSearchNotebookTitleById,
  addSavedSearchResultToNotebook
} from 'redux/modules/searchNotebooks';
import {
  getSearchResultById,
} from 'redux/modules/searchResults';
import {
  getLastSearchQueryId,
} from 'redux/modules/searchQueries';
import {
  saveSearchResult,
} from 'redux/modules/savedSearchResults';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 150,
    marginBottom: theme.spacing(2),
  },
}));

const NotebookItem = forwardRef(({id, searchResultId}, ref) => {
  const dispatch = useDispatch();
  const title = useSelector(getSearchNotebookTitleById(id));
  const searchResult = useSelector(getSearchResultById(searchResultId));
  const queryId = useSelector(getLastSearchQueryId());

  const onClick = () => {
    dispatch(saveSearchResult(searchResult, queryId));
    dispatch(addSavedSearchResultToNotebook(id, searchResultId));
  };

  return (
    <MenuItem onClick={onClick} value={id} ref={ref}>
      {title}
    </MenuItem>
  );
});
NotebookItem.muiName = MenuItem.muiName;

const NotebookSelect = ({ searchResultId }) => {
  const styles = useStyles();
  const searchNotebooksIds = useSelector(getAllSearchNotebooksIds());

  const searchNotebooks = searchNotebooksIds.map((id) =>
    <NotebookItem id={id} searchResultId={searchResultId} key={id}/>
  );

  return (
    <FormControl className={styles.formControl}>
      <InputLabel>Add to notebook</InputLabel>
      <Select>
        {searchNotebooks}
      </Select>
    </FormControl>
  );
};

export default NotebookSelect;
