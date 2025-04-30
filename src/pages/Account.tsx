import Heading from '@components/common/Heading/Heading';
import { useAppSelector } from '@store/hooks';


function Account() {
   const accountInfo = useAppSelector((state) => state.Authslice.user);

   return (
     <>
       <Heading>Account Info</Heading>
       <ul>
    
         <li>Email: {accountInfo?.email}</li>
       </ul>
     </>
   );
}

export default Account