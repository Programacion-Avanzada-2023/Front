import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export function Footer() {
  return (
    <MDBFooter className='custom-footer' color='white' bgColor='dark'>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright: Los Santos Customs
      </div>
    </MDBFooter>
  );
}

export default Footer;