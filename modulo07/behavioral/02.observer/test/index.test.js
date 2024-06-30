import { test, jest, expect } from '@jest/globals'
import PaymentSubject from '../src/events/subjects/paymentSubject';
import Payment from '../src/events/payment';
import Shipment from '../src/observers/shipment';
import Marketing from '../src/observers/marketing';

describe('test suite for observer pattern', () => {
  
  test.todo('#paymentSubject notify observers')
  test.todo('#paymentSubject should not notify unsubscribe')
  test.todo('#paymentSubject should notify subscribe after a credit card transaction')
  test.todo('#All should notify subscriber after a credit card payment')
  
  it('#paymentSubject notify observers', () => {
      const subject = new PaymentSubject()
      const observer = {
        update: jest.fn()
      }

      subject.subscribe(observer)
      const data = 'hello world'
      const expected = data

      subject.notify(data)
      expect(observer.update).toBeCalledWith(expected)
  });

  it('#paymentSubject should not notify unsubscribe', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }

    subject.subscribe(observer)
    subject.unsubscribe(observer)

    const data = 'hello world'
    subject.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  });

  it('#paymentSubject should notify subscribe after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const spy = jest.spyOn(payment.paymentSubject, 'notify')
    
    const data = 'hello world'
    const expected = data
    
    payment.creditCard(data)

    expect(spy).toBeCalledWith(expected)      
  });

  it('#All should notify subscriber after a credit card payment', () => {
    const subject = new PaymentSubject() //criei meu subject
    const shipment = new Shipment() // criei um observer
    const marketing = new Marketing() // criei um observer

    const shipmentSpy = jest.spyOn(shipment, 'update')
    const marketingSpy = jest.spyOn(marketing, 'update')

    subject.subscribe(shipment) //adiciono uma inscrição de subject
    subject.subscribe(marketing) //adiciono uma inscrição de subject

    const payment = new Payment(subject)
    const data = {userName: 'test', id: Date.now()}
    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  });
  
});
