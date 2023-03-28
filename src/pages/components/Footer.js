import React from 'react'
import Container from './Container'
import './Footer.scss'

export default function Footer() {
  return (
    <div className='footer'>
        <Container>
            <div className='about-section'>
                <div className='logo-wrapper'>
                    <img src='https://cdn.pixabay.com/photo/2021/03/17/10/28/cat-6102014_960_720.png' alt='page-logo-cat-icon'></img>
                </div>
                <div className='info'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis vitae nullam aliquet.</p>
                    <p>Copyright © {new Date().getFullYear()} AWESOME. All rights reserved</p>
                </div>
            </div>
            <div className='socials-wrapper'>
                <a className='social-link' href='https://instagram.com/' target='_blank'>
                    <div class="social-icon">
                        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.00093 0.466797C6.68339 0.466797 6.39255 0.47693 5.48232 0.518353C4.57386 0.559953 3.95377 0.703777 3.41118 0.914802C2.84993 1.13276 2.37384 1.42432 1.89952 1.89881C1.42485 2.37313 1.13329 2.84922 0.914624 3.41029C0.703066 3.95305 0.559065 4.57333 0.518175 5.48143C0.477464 6.39166 0.466797 6.68268 0.466797 9.00022C0.466797 11.3178 0.477108 11.6077 0.518353 12.5179C0.560131 13.4264 0.703955 14.0465 0.914802 14.5891C1.13294 15.1503 1.4245 15.6264 1.89899 16.1007C2.37313 16.5754 2.84922 16.8677 3.41012 17.0856C3.95306 17.2967 4.57333 17.4405 5.4816 17.4821C6.39184 17.5235 6.68251 17.5336 8.99986 17.5336C11.3176 17.5336 11.6075 17.5235 12.5178 17.4821C13.4262 17.4405 14.047 17.2967 14.59 17.0856C15.151 16.8677 15.6264 16.5754 16.1006 16.1007C16.5752 15.6264 16.8668 15.1503 17.0855 14.5893C17.2952 14.0465 17.4392 13.4262 17.4819 12.5181C17.5228 11.6079 17.5335 11.3178 17.5335 9.00022C17.5335 6.68268 17.5228 6.39184 17.4819 5.4816C17.4392 4.57315 17.2952 3.95306 17.0855 3.41047C16.8668 2.84922 16.5752 2.37313 16.1006 1.89881C15.6259 1.42414 15.1512 1.13258 14.5894 0.914802C14.0454 0.703777 13.425 0.559953 12.5165 0.518353C11.6063 0.47693 11.3165 0.466797 8.99826 0.466797H9.00093ZM8.23537 2.00457C8.46258 2.00421 8.71609 2.00457 9.00089 2.00457C11.2793 2.00457 11.5494 2.01274 12.4491 2.05363C13.2811 2.09168 13.7327 2.2307 14.0335 2.3475C14.4317 2.50217 14.7156 2.68706 15.0141 2.98573C15.3128 3.2844 15.4977 3.56885 15.6527 3.96708C15.7695 4.26752 15.9087 4.71908 15.9466 5.55109C15.9875 6.45066 15.9963 6.72088 15.9963 8.99824C15.9963 11.2756 15.9875 11.5458 15.9466 12.4454C15.9085 13.2774 15.7695 13.729 15.6527 14.0294C15.498 14.4276 15.3128 14.7112 15.0141 15.0097C14.7154 15.3084 14.4319 15.4932 14.0335 15.6479C13.733 15.7652 13.2811 15.9039 12.4491 15.942C11.5495 15.9828 11.2793 15.9917 9.00089 15.9917C6.72229 15.9917 6.45224 15.9828 5.55268 15.942C4.72067 15.9036 4.26911 15.7645 3.96813 15.6477C3.5699 15.4931 3.28546 15.3082 2.98679 15.0095C2.68812 14.7108 2.50323 14.4271 2.3482 14.0287C2.2314 13.7282 2.0922 13.2767 2.05433 12.4447C2.01344 11.5451 2.00527 11.2749 2.00527 8.99611C2.00527 6.71733 2.01344 6.44852 2.05433 5.54896C2.09238 4.71695 2.2314 4.26539 2.3482 3.96459C2.50287 3.56636 2.68812 3.28191 2.98679 2.98324C3.28546 2.68457 3.5699 2.49968 3.96813 2.34466C4.26893 2.22732 4.72067 2.08866 5.55268 2.05043C6.33989 2.01488 6.64496 2.00421 8.23537 2.00243V2.00457ZM13.556 3.42147C12.9906 3.42147 12.532 3.87961 12.532 4.44513C12.532 5.01047 12.9906 5.46914 13.556 5.46914C14.1213 5.46914 14.58 5.01047 14.58 4.44513C14.58 3.87979 14.1213 3.42147 13.556 3.42147ZM9.00095 4.61793C6.58083 4.61793 4.61868 6.58008 4.61868 9.0002C4.61868 11.4203 6.58083 13.3816 9.00095 13.3816C11.4211 13.3816 13.3825 11.4203 13.3825 9.0002C13.3825 6.58008 11.4211 4.61793 9.00095 4.61793ZM9.00091 6.15572C10.5718 6.15572 11.8454 7.42916 11.8454 9.0002C11.8454 10.5711 10.5718 11.8447 9.00091 11.8447C7.42987 11.8447 6.15644 10.5711 6.15644 9.0002C6.15644 7.42916 7.42987 6.15572 9.00091 6.15572Z"
                                fill="#647B64" 
                            />
                        </svg>
                    </div>
                </a>

                <a className='social-link' href='https://twitter.com/' target='_blank'>
                    <div class="social-icon">
                        <svg viewBox="0 0 16 14" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.5208 4.0051L7.55438 4.55873L6.99479 4.49094C4.95791 4.23107 3.17843 3.34977 1.66756 1.86964L0.928908 1.13523L0.73865 1.67757C0.33575 2.88653 0.593158 4.16328 1.43253 5.02198C1.8802 5.49653 1.77948 5.56432 1.00725 5.28185C0.73865 5.19146 0.503625 5.12367 0.481242 5.15757C0.4029 5.23666 0.6715 6.26484 0.884142 6.67159C1.17513 7.23653 1.76828 7.79016 2.4174 8.11782L2.96579 8.37769L2.31668 8.38899C1.68994 8.38899 1.66756 8.40029 1.73471 8.63756C1.95854 9.37198 2.84268 10.1516 3.82755 10.4906L4.52143 10.7278L3.91708 11.0894C3.02175 11.6091 1.96973 11.9029 0.917717 11.9255C0.414092 11.9368 0 11.982 0 12.0159C0 12.1289 1.36538 12.7616 2.15999 13.0102C4.54382 13.7446 7.37531 13.4282 9.50173 12.1741C11.0126 11.2815 12.5235 9.50756 13.2286 7.79016C13.6091 6.87497 13.9896 5.20276 13.9896 4.40055C13.9896 3.88081 14.0232 3.81302 14.6499 3.19159C15.0192 2.83003 15.3662 2.43458 15.4333 2.32159C15.5452 2.10692 15.534 2.10692 14.9633 2.299C14.012 2.63796 13.8777 2.59276 14.3477 2.08432C14.6947 1.72276 15.1088 1.06744 15.1088 0.875359C15.1088 0.841463 14.9409 0.897957 14.7506 0.999645C14.5492 1.11263 14.1015 1.28211 13.7658 1.3838L13.1614 1.57588L12.613 1.20302C12.3108 0.999645 11.8856 0.773671 11.6617 0.705879C11.0909 0.547697 10.218 0.570295 9.70318 0.751074C8.30422 1.25952 7.42008 2.57016 7.5208 4.0051Z"
                                fill="#647B64" 
                            />
                        </svg>
                    </div>
                </a>

                <a className='social-link' href='https://www.youtube.com/' target='_blank'>
                    <div class="social-icon">
                            <svg viewBox="0 0 18 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.6677 0.49952C16.4021 0.70103 16.9804 1.29478 17.1767 2.04878C17.5333 3.41533 17.5333 6.26663 17.5333 6.26663C17.5333 6.26663 17.5333 9.11784 17.1767 10.4845C16.9804 11.2385 16.4021 11.8322 15.6677 12.0338C14.3369 12.4 9.00001 12.4 9.00001 12.4C9.00001 12.4 3.66309 12.4 2.33218 12.0338C1.59783 11.8322 1.0195 11.2385 0.823232 10.4845C0.466675 9.11784 0.466675 6.26663 0.466675 6.26663C0.466675 6.26663 0.466675 3.41533 0.823232 2.04878C1.0195 1.29478 1.59783 0.70103 2.33218 0.49952C3.66309 0.133301 9.00001 0.133301 9.00001 0.133301C9.00001 0.133301 14.3369 0.133301 15.6677 0.49952ZM7.40002 3.86658V9.19991L11.6667 6.53335L7.40002 3.86658Z"
                                    fill="#647B64" />
                            </svg>
                    </div>
                </a>

            </div>
        </Container>
    </div>

  )
}