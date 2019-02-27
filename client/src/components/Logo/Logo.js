import React from 'react';

const logo = ()=>{
    return(
        <div>
            <img style={{
                height: 120,
                width: 120,
                margin: 'auto',
                display: 'block',
                marginTop: 80,
            }} 
            alt="Logo" 
            src={require('../../assets/logo.png')} />
        </div>
    )
}

export default logo;