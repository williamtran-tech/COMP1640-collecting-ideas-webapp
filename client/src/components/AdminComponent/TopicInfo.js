import React, { useEffect } from 'react'
import { TextField,Button } from '@material-ui/core'
import { useState } from 'react'
const TopicInfo = ({inf, isDisable, setDisable}) => {
    const [values, setValues] = useState({});
    const [formDisabled, setFormDisabled] = useState(true);
    useEffect(()=>{
        setValues({
            name: inf[0].name,
            description: inf[0].description,
            closureDate: inf[0].closureDate,
            finalClosureDate: inf[0].finalClosureDate,
            ideaQuantity: inf[0].idea_quantity
        })
        setFormDisabled(true)
    },[inf])
      const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setFormDisabled(false)
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
            inputProps={{ style: { fontSize: '12px' } }}
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
            inputProps={{ style: { fontSize: '12px' } }}
            disabled={isDisable}
        />
        <Button variant="contained" color="primary"  disabled={formDisabled} style={{ float: 'right', marginTop: 16,  marginBottom: 16 }}>
          Update
        </Button>
        </form>
        
    </div>
  )
}

export default TopicInfo