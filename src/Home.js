import './home.css'
import Card from 'react-bootstrap/Card';
import bank from '../src/images/bank.webp';
export default function Home() {
  return (
    <div >
   <br/> <center> <h2>BAD BANK</h2></center> <br/>
 
   <div className="marquee-container">
      <div className="marquee">
      <h4>Welcome to BAD BANK - Deposite , Withdraw , Borrow effortlessly, Repay flexibly... 
Get upto ₹5 lakh and repay flexibly across 12 months. No interest charged if paid in one month!</h4>
      </div>
    </div>
  <center>
    <Card style={{ width: '50%' }}>
      <Card.Img variant="top" src={bank} height={500} width={500} alt='bankimage'/>
      <Card.Body>
        <Card.Title>BAD BANK</Card.Title>
        <Card.Text>
        “Everyday is a bank account, and the time is our currency. No one is rich, no one is poor, we’ve got 24 hours each.”
        </Card.Text>
      </Card.Body>
    </Card>
    </center>
    <br/>
    <br/>
    <br/>
     </div>
  )
}

 