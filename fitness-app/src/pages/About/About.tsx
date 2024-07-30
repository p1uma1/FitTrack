import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import './About.css';

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <MDBFooter ref={ref} bgColor='dark' className='text-center text-white text-lg-left'>
      <MDBContainer className='p-4 pb-0'>
        <section className='social-media'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <MDBContainer className='text-left p-4'>
        <section className='mb-4'>
          <MDBRow>
            <MDBCol lg='4' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Company</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>About Us</a></li>
                <li><a href='#!' className='text-white'>Careers</a></li>
                <li><a href='#!' className='text-white'>Press</a></li>
                <li><a href='#!' className='text-white'>Blog</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='4' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Resources</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>Help Center</a></li>
                <li><a href='#!' className='text-white'>Contact Us</a></li>
                <li><a href='#!' className='text-white'>Privacy Policy</a></li>
                <li><a href='#!' className='text-white'>Terms of Service</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='4' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Follow Us</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='#!' className='text-white'>LinkedIn</a></li>
                <li><a href='#!' className='text-white'>Twitter</a></li>
                <li><a href='#!' className='text-white'>Facebook</a></li>
                <li><a href='#!' className='text-white'>Instagram</a></li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
});

export default About;
