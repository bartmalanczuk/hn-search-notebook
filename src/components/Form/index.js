import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  form: {
    margin: `${theme.spacing(8)}px 0`,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flexGrow: '1',
    marginRight: theme.spacing(2),
  },
}));

const Form = ({ onSubmit, label }) => {
  const styles = useStyles();
  const [text, setText] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(text)
  };

  return (
    <form onSubmit={onFormSubmit} autoComplete="off" className={styles.form}>
      <TextField
        onChange={(event) => setText(event.target.value)}
        value={text}
        label={label}
        variant="outlined"
        size="small"
        className={styles.input}
      />
      <Button type="submit" variant="contained" color="primary" size="medium">Submit</Button>
    </form>
  );
};

export default Form;
