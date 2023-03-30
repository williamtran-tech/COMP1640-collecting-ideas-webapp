import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import handleApi from '../../../service/handleApi';
import checkToken from '../../../service/checkToken';
const DeleteTopicModal = ({setConfirm ,confirm, setDeleted, deleted, idTopic}) => {
    const token= checkToken()
    const handleCloseModal = () => {
      setConfirm(false);
      };
    const deleteTopic = () => {
        setConfirm(false)
        handleApi.admin_force_delete_topic(idTopic,token.roleId).then(response=>{
            console.log(response.data)
            setDeleted(!deleted)
        })
    }
  return (
    <Dialog
    open={confirm}
    onClose={handleCloseModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete Topic</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        This topic contain available ideas. Are you sure you want to delete this Topic?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal} color="primary">
        Cancel
      </Button>
      <Button onClick={deleteTopic} color="primary" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default DeleteTopicModal