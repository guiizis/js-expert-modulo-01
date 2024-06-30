import Payment from "./events/payment.js";
import PaymentSubject from "./events/subjects/paymentSubject.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";

const marketing = new Marketing()
const shipment = new Shipment()
const subject = new PaymentSubject()

subject.subscribe(marketing)
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({userName: 'test', id: Date.now()})