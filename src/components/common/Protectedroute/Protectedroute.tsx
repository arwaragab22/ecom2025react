import { useAppSelector } from '@store/hooks'
import React from 'react'
import { Navigate } from 'react-router-dom'



export default function Protectedroute({ children }: { children: React.ReactNode }) {
    const {accessToken }=useAppSelector(state=>state.Authslice)
    
    return( accessToken? (<div>
          {children}
    </div>):
 (<Navigate to="/login?message=needtologin"></Navigate>)) 
     
  
}