import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { openCommentsModal } from 'store/slices/view';

// components
import TopCommenters from './TopCommenters';
// images
import commentorLogo from '../images/commentorLogo.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1,
    color: 'white'
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleOpen = () => dispatch(openCommentsModal())

  return (
    <>
      <AppBar position='fixed' className={classes.root}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img width={100} alt='commentor_logo' src={commentorLogo} />
          <Button endIcon={<Icon>send</Icon>} variant='outlined' color='secondary' onClick={handleOpen}>Add Comment </Button>
        </Toolbar>
      </AppBar>
      <TopCommenters />
    </>
  )
};

export default Header
