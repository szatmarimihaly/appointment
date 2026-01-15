import React from 'react'

const DescriptionCard = () => {
  return (
    <div className='bg-cardback mx-4 lg:mx-70 mt-20 p-6 rounded border border-inputcolor mb-100'>
        <h3 className='text-white font-bold text-2xl mb-4 text-center lg:text-start'>
            Streamline your bookings and save time with our appointment system
        </h3>
        <p className='text-textcolor'>Our appointment system removes the friction from scheduling by automating the entire booking process. Clients can choose available time slots instantly, receive automatic confirmations and reminders, and reschedule when needed, without contacting you directly. This dramatically reduces no-shows, cuts down on unnecessary messages, and keeps your calendar accurate at all times. With less time spent managing appointments, you can stay focused on delivering great service and growing your business.</p>
    </div>
  )
}

export default DescriptionCard