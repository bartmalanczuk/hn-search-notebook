import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  getSearchQueryText,
} from 'redux/modules/searchQueries';

const useStyles = makeStyles((theme) => ({
  statistics: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));

const getNumberOfHitsSince = async (queryText, timestamp) => {
  const response = await fetch(
    `http://hn.algolia.com/api/v1/search?query=${queryText}&numericFilters=created_at_i>${timestamp}`
  );
  const body = await response.json();

  return body.nbHits;
};

const QueryRow = ({ id }) => {
  const queryText = useSelector(getSearchQueryText(id));
  const yesterday = Math.floor((new Date() - 24*60*60*1000) / 1000);
  const previousWeek = Math.floor((new Date() - 24*60*60*1000*7) / 1000);
  const [hitsSinceYesterday, setHitsSinceYesterday] = useState(0);
  const [hitsFromLastWeek, setHitsFromLastWeek] = useState(0);

  useEffect(() => {
    (async () => {
      setHitsSinceYesterday(await getNumberOfHitsSince(queryText, yesterday));
      setHitsFromLastWeek(await getNumberOfHitsSince(queryText, previousWeek));
    })();
  }, []);

  return (
    <TableRow>
      <TableCell>{queryText}</TableCell>
      <TableCell>{hitsSinceYesterday}</TableCell>
      <TableCell>{hitsFromLastWeek}</TableCell>
    </TableRow>
  );
};

const Statistics = ({ queryIds }) => {
  const styles = useStyles();

  return (
    <TableContainer component={Paper} className={styles.statistics}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Query</TableCell>
            <TableCell>Hits from last 24h</TableCell>
            <TableCell>Hits from last week</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { queryIds.map((id) => <QueryRow id={id} key={id} />) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Statistics;
