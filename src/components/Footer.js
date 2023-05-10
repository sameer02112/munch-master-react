export const Footer = () => {
    return(
        <div className="footer-container">
            <div>
                <h4>COMPANY</h4>
                <p>About Us</p>
                <p>Team</p>
                <p>Career</p>
                <p>Munch Master Blogs</p>
                <p>Bug Bounty</p>
            </div>
            <div>
                <h4>CONTACT</h4>
                <p>Help & Support</p>
                <p>Partner With Us</p>
                <p>Ride With Us</p>
            </div>
            <div>
                <h4>LEGAL</h4>
                <p>Terms & Conditions</p>
                <p>Refunds & Cancellations</p>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
                <p>Offer Term</p>
                <p>Phishing & Fraud</p>
                <p>Corporate</p>
            </div>
            <div className="footer-img-container"> 
                <img className="footer-appstore-img" src={'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv'} alt="appstorelogo"/>
                <img className="footer-appstore-img" src={'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl'} alt="appstorelogo"/>
            </div>
        </div>
    )
}