import moment from "moment";
import React, { useEffect, useState } from "react";
import api from "services/api";

const List = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPaymentsMethod();
  }, []);

  const getPaymentsMethod = async () => {
    const res = await api.axios.get('/v1/payment')

    if (res) {
      setPayments(res.paymentsMethod.data)
    }
  };

  const deteleCard = async (cardId) => {
    await api.axios.delete('/v1/payment', { data: { cardId } })
    getPaymentsMethod()
  }

  return (
    <div>
      {!payments?.length ? (
        <div>
          <div className="italic text-gray-400 text-center">
            Pas de moyen de paiment enregistré
          </div>
          <div className="h-px w-full mt-2 bg-gray-300" />
        </div>
      ) : (
        payments.map((payment, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <div className="font-gibson">
                <div className="flex text-dark-500 items-center font-semibold space-x-3">
                  <div>{(payment.card.brand).toUpperCase()}</div>
                  <div>•••• {payment.card.last4}</div>
                </div>
                <div className="text-gray-500">Expire en {moment(payment.card.exp_month, 'MM').format('MMM')} {payment.card.exp_year}</div>
              </div>
              <div onClick={() => deteleCard(payment.id)} className="underline text-primary-500 cursor-pointer font-semibold">Supprimer la carte</div>
            </div>
            <div className="h-px w-full mt-2 bg-gray-300 my-2"/>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
