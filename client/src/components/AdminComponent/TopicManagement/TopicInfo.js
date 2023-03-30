import React, { useEffect } from 'react'
import { TextField,Button, Snackbar } from '@material-ui/core'
import { Alert, Slide, Typography } from '@mui/material';
import { useState } from 'react'
import handleApi from '../../../service/handleApi';
import moment from 'moment';
const TopicInfo = ({inf, isDisable,setDisable, setUpdated, token}) => {
    const [values, setValues] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [checkDate, setCheckDate] = useState(false);
    const [open, setOpen]= useState(false)
    useEffect(()=>{
        setValues({
            name: inf[0].name,
            description: inf[0].description,
            closureDate: inf[0].closureDate,
            finalClosureDate: inf[0].finalClosureDate,
            ideaQuantity: inf[0].idea_quantity
        })
        setButtonDisabled(true)
    },[inf])
      const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setButtonDisabled(false)
      };
      const handleUpdateTopic = ()=>{
          const data={
            name: values.name,
            description: values.description,
            closureDate: values.closureDate,
            finalClosureDate: values.finalClosureDate
          } 
          if(data.closureDate>data.finalClosureDate){
            setCheckDate(true)
          }else{
          handleApi.admin_update_topic(inf[0].id,data, token.roleId ).then( reponse=>{
                        console.log(reponse.data)
                        setUpdated(true)
                        setOpen(true)
                        setDisable(true)
                        setButtonDisabled(true)
                        setCheckDate(false)
            })
          }
          
      }
      const handleClose = () => {
        setOpen(false)
      };
  return (
    <div>
       <form className='form_update'>
        <TextField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter name"
            inputProps={{ style: { fontSize: '12px' } }}
            InputLabelProps={{
                shrink: true,
              }}
            disabled={isDisable}
        />
        <TextField
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            placeholder="Enter description"
            inputProps={{ style: { fontSize: '12px' } }}
            InputLabelProps={{
                shrink: true,
              }}
            disabled={isDisable}
        />
        <TextField
            label="Closure Date"
            name="closureDate"
            value={values.closureDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="datetime-local"
            InputLabelProps={{
                shrink: true,
              }}
            placeholder="Enter closure date"
            inputProps={{ style: { fontSize: '12px' }, min: moment().format('YYYY-MM-DDTHH:mm'), }}
            disabled={isDisable}
        />
        <TextField
            label="Final Closure Date"
            name="finalClosureDate"
            value={values.finalClosureDate}
            onChange={handleChange}
            InputLabelProps={{
                shrink: true,
              }}
              
            fullWidth
            margin="normal"
            type="datetime-local"
            inputProps={{ style: { fontSize: '12px' },  min:values.closureDate , }}
            disabled={isDisable}
        />
        {
          checkDate&&( <Typography  style={{fontSize: 12, color: "#FC2947"}}>Final date must be greater than closure date. </Typography>)
        }
       
        <Button variant="contained" color="primary"  onClick={handleUpdateTopic} disabled={buttonDisabled} style={{ float: 'right', marginTop: 16,  marginBottom: 16 }}>
          Update
        </Button>
        </form>
        <Snackbar
         open={open}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         autoHideDuration={2000}
         TransitionComponent={Slide}
        TransitionProps={{ direction: 'left' }}
         >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>
    </div>
  )
}

export default TopicInfo