import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

import SearchNotebook from 'components/SearchNotebook';
import Form from 'components/Form';
import {
  createSearchNotebook,
  getAllSearchNotebooksIds,
} from 'redux/modules/searchNotebooks';

const SearchNotebooksView = () => {
  const dispatch = useDispatch();
  const searchNotebooksIds = useSelector(getAllSearchNotebooksIds());

  const searchNotebooks = searchNotebooksIds.map((id) => <SearchNotebook id={id} key={id} />);

  return (
    <Container maxWidth="sm">
      <Form
        label="Create notebook"
        onSubmit={(title) => dispatch(createSearchNotebook(title, new Date()))}
      />
      { searchNotebooks }
    </Container>
  );
}

export default SearchNotebooksView;
