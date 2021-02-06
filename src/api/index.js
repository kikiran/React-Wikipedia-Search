import React from 'react';
import axios from 'axios'

const api = 'http://en.wikipedia.org/w/api.php';



export function wikiPediaApi(searchTerm) {
   
    try {
    return  axios.get(api, {
        params:{    
            action: "query",
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: searchTerm
        },
        
        

        },
        {timeout: 5000},
       
        )
        .then(response => {
            if(response != 200) {
                console.log(response.data)
                return response.data;
            }
            else {
                return null
            }
        })
    }
    catch(err){
        console.log(err)
    }

   
}