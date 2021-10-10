import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getPhones } from '../../actions/phoneActions'
import { useDispatch, useSelector } from 'react-redux'

const PhoneUp = () => {
  const dispatch = useDispatch()

  const phoneData = useSelector((state) => state.phoneList)
  const { loading, error, phones } = phoneData

  const [listPhone, setListPhone] = useState([])
  const [listPhoneCarrier, setListPhoneCarrier] = useState([])
  const [filterData, setFilterData] = useState([])

  // Call Black List Alliance API by filter result 0 no block and 1 is block
  const getApiBlackListData = () => {
    phones.reduce(async (prev, phoneNumber) => {
      await prev
      const { data } = await axios.get(
        `https://api.blacklistalliance.com/standard/api/v1/Lookup/key/b128a57d1da0fdaea16f8ab95883a5f2/response/json/phone/${phoneNumber.phone}`
      )
      if (data) {
        setListPhone((listPhone) => [
          ...listPhone,
          {
            phone: phoneNumber.phone,
            wireless: data.wireless,
            status: data.status,
            results: data.results,
          },
        ])
      }

      return Promise.resolve()
    }, Promise.resolve())
  }

  console.log('API List Filter', listPhone)


// Filter Data when results = 0
  const FilterData = () => {
    let filterStatus = listPhone?.filter(
      (phoneBk) => phoneBk.wireless === 1 && phoneBk.results === 0
    )
    setFilterData(filterStatus)
    getApiCarrierData()
  }

  console.log('Filter Data Black List', filterData)

  // Call Email OverSight API Select Carrier by phone
  const getApiCarrierData = () => {
    listPhone.reduce(async (prev, phoneNumber) => {
      await prev
      const { data } = await axios.get(
        `https://api.emailoversight.com/api/PhoneValidation?apitoken=8466c45b-6467-47d8-a594-4966f8e4461e&phonenumber=${phoneNumber.phone}`
      )
      if (data) {
        setListPhoneCarrier((listPhoneCarrier) => [
          ...listPhoneCarrier,
          {
            phone: data.PhoneNumber,
            carrier: data.Carrier,
            wireless: phoneNumber.wireless,
            status: phoneNumber.status,
            results: phoneNumber.results,
          },
        ])
      }

      return Promise.resolve()
    }, Promise.resolve())
  }

  console.log('API List Carrier', listPhoneCarrier)

  useEffect(() => {
    dispatch(getPhones())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div>
      <h1>Phones Upload</h1>
      <div className="container">
        <button onClick={() => getApiBlackListData()}>Filter Black List</button>
        <br />
        <button onClick={() => FilterData()}>Filter Carrier List</button>
      </div>
    </div>
  )
}

export default PhoneUp
