import React from 'react'
import axios from 'axios'
const getTasks=()=>{
    return axios.get('https://jsonplaceholder.typicode.com/todos')
}

export default {getTasks}