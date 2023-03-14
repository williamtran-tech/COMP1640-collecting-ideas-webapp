import React from 'react'
import handleApi from './handleApi'

const admin_hanldeDeleteTopic = (id, quantity) => {
    if(quantity=0){
        handleApi.admin_delete_topic(id).then(response=>{
            console.log(response.data)
        })
    }else{
        handleApi.admin_force_delete_topic(id).then(response=>{
            console.log(response.data)
        })
        return (<>hello</>)
    }
}
export default admin_hanldeDeleteTopic