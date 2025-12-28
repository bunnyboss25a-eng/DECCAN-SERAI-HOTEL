import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingState, GuestDetails } from '../types';

export const QuickBook: React.FC = () => {
  const [booking, setBooking] = useState<BookingState>({
    checkIn: '',
    checkOut: '',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    adults: 2,
    children: 0,
    childAges: [],
    addOns: {
      airportTransfer: false,
      breakfastIncluded: true,
      earlyCheckIn: false
    }
  });

  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    fullName: '',
    email: '',
    origin: '',
    address: '',
    purpose: '',
    cellNo: '',
    aadhaarNo: ''
  });

  const [showGuests, setShowGuests] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingStep, setBookingStep] = useState<'summary' | 'details' | 'sending' | 'success'>('summary');

  const handleCheckAvailability = () => {
    if (!booking.checkIn || !booking.checkOut) {
      alert("Please select arrival and departure dates.");
      return;
    }
    setBookingStep('summary');
    setShowConfirm(true);
  };

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleBookingSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestDetails.fullName || !guestDetails.email || !guestDetails.cellNo || !guestDetails.aadhaarNo || !guestDetails.address) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    
    setBookingStep('sending');
    
    // Create a rich summary for the hotel email
    const addOnList = Object.entries(booking.addOns)
      .filter(([_, val]) => val)
      .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').trim())
      .join(", ");

    const hotelSummary = `
      New Booking Request for Deccan Serai
      ------------------------------------
      Guest: ${guestDetails.fullName}
      Stay: ${booking.checkIn} to ${booking.checkOut}
      Occupancy: ${booking.adults} Adults, ${booking.children} Children
      Purpose: ${guestDetails.purpose}
      Add-ons: ${addOnList || 'None'}
      Origin: ${guestDetails.origin}
    `.trim();

    try {
      // Netlify Form Submission
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "deccan-serai-booking",
          "subject": `New Reservation: ${guestDetails.fullName} (${booking.checkIn})`,
          "summary": hotelSummary,
          "fullName": guestDetails.fullName,
          "email": guestDetails.email,
          "cellNo": guestDetails.cellNo,
          "origin": guestDetails.origin,
          "address": guestDetails.address,
          "aadhaarNo": guestDetails.aadhaarNo,
          "purpose": guestDetails.purpose,
          "checkIn": booking.checkIn,
          "checkOut": booking.checkOut,
          "adults": booking.adults.toString(),
          "children": booking.children.toString(),
          "addOns": addOnList
        })
      });
      
      setBookingStep('success');
    } catch (error) {
      console.error("Booking failed:", error);
      alert("We encountered an error processing your reservation. Please try again or contact concierge.");
      setBookingStep('details');
    }
  };

  const closeModals = () => {
    setShowConfirm(false);
    setTimeout(() => setBookingStep('summary'), 300);
  };

  return (
    <div className="w-full max-w-7xl mx-auto -mt-16 lg:-mt-20 relative z-30 px-6">
      <div className="bg-white rounded-[2.5rem] p-4 lg:p-8 shadow-2xl butterfly-light border border-slate-100">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          <div className="flex-1 w-full group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Arrival</label>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 group-hover:border-[#C5A059] transition-colors">
              <input 
                type="date" 
                className="bg-transparent outline-none font-medium text-[#002366] cursor-pointer text-base w-full"
                onChange={(e) => setBooking({...booking, checkIn: e.target.value})}
              />
              <span className="text-xs text-slate-300 font-medium ml-4">14:00</span>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-12 bg-slate-100"></div>

          <div className="flex-1 w-full group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Departure</label>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 group-hover:border-[#C5A059] transition-colors">
              <input 
                type="date" 
                className="bg-transparent outline-none font-medium text-[#002366] cursor-pointer text-base w-full"
                onChange={(e) => setBooking({...booking, checkOut: e.target.value})}
              />
              <span className="text-xs text-slate-300 font-medium ml-4">12:00</span>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-12 bg-slate-100"></div>

          <div className="flex-1 w-full relative group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Occupancy</label>
            <button 
              onClick={() => setShowGuests(!showGuests)}
              className="w-full text-left font-medium text-[#002366] flex items-center justify-between border-b border-slate-100 pb-2 group-hover:border-[#C5A059] transition-colors"
            >
              <span className="text-base truncate">{booking.adults} Adults, {booking.children} Children</span>
              <i className={`fas fa-chevron-down text-[10px] text-slate-300 transition-transform ${showGuests ? 'rotate-180' : ''}`}></i>
            </button>

            <AnimatePresence>
              {showGuests && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 w-full min-w-[280px] bg-white rounded-3xl shadow-2xl p-6 z-50 border border-slate-100"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#002366]">Adults</span>
                        <span className="text-[10px] text-slate-400">Ages 13+</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setBooking({...booking, adults: Math.max(1, booking.adults - 1)})} className="w-10 h-10 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-center">-</button>
                        <span className="w-4 text-center font-bold">{booking.adults}</span>
                        <button onClick={() => setBooking({...booking, adults: booking.adults + 1})} className="w-10 h-10 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-center">+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#002366]">Children</span>
                        <span className="text-[10px] text-slate-400">Ages 0-12</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setBooking({...booking, children: Math.max(0, booking.children - 1)})} className="w-10 h-10 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-center">-</button>
                        <span className="w-4 text-center font-bold">{booking.children}</span>
                        <button onClick={() => setBooking({...booking, children: booking.children + 1})} className="w-10 h-10 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-center">+</button>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowGuests(false)}
                      className="w-full py-3 bg-[#002366] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/20"
                    >
                      Apply Changes
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-none w-full lg:w-auto">
            <button 
              onClick={handleCheckAvailability}
              className="w-full bg-[#C5A059] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#C5A059]/30"
            >
              Check Availability
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-slate-50">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="peer hidden" 
                checked={booking.addOns.breakfastIncluded}
                onChange={(e) => setBooking({
                  ...booking, 
                  addOns: {...booking.addOns, breakfastIncluded: e.target.checked}
                })} 
              />
              <div className="w-5 h-5 border-2 border-slate-200 rounded-md peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] transition-all"></div>
              <i className="fas fa-check absolute inset-0 text-white text-[10px] flex items-center justify-center scale-0 peer-checked:scale-100 transition-transform"></i>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#002366] transition-colors">Breakfast Included</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="peer hidden"
                checked={booking.addOns.airportTransfer}
                onChange={(e) => setBooking({
                  ...booking, 
                  addOns: {...booking.addOns, airportTransfer: e.target.checked}
                })} 
              />
              <div className="w-5 h-5 border-2 border-slate-200 rounded-md peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] transition-all"></div>
              <i className="fas fa-check absolute inset-0 text-white text-[10px] flex items-center justify-center scale-0 peer-checked:scale-100 transition-transform"></i>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#002366] transition-colors">Airport Transfer</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                className="peer hidden"
                checked={booking.addOns.earlyCheckIn}
                onChange={(e) => setBooking({
                  ...booking, 
                  addOns: {...booking.addOns, earlyCheckIn: e.target.checked}
                })} 
              />
              <div className="w-5 h-5 border-2 border-slate-200 rounded-md peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] transition-all"></div>
              <i className="fas fa-check absolute inset-0 text-white text-[10px] flex items-center justify-center scale-0 peer-checked:scale-100 transition-transform"></i>
            </div>
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#002366] transition-colors">Early Check-In</span>
          </label>
        </div>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModals}
              className="absolute inset-0 bg-[#002366]/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]"
            >
              <div className="absolute top-0 right-0 p-8">
                 <button onClick={closeModals} className="text-slate-300 hover:text-[#002366] transition-colors">
                   <i className="fas fa-times text-xl"></i>
                 </button>
              </div>

              {bookingStep === 'summary' && (
                <div className="space-y-8">
                  <div className="mb-10">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#C5A059] text-2xl mb-6">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <h3 className="text-3xl font-serif text-[#002366] mb-2">Review Selection</h3>
                    <p className="text-slate-400 text-sm">Verify your dates and guests before confirming your identity.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-In</p>
                        <p className="text-[#002366] font-bold text-lg">{booking.checkIn}</p>
                      </div>
                      <div className="w-[1px] bg-slate-200"></div>
                      <div className="flex-1 text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-Out</p>
                        <p className="text-[#002366] font-bold text-lg">{booking.checkOut}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[#002366]/5 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <i className="fas fa-users text-[#C5A059]"></i>
                         <span className="text-sm font-bold text-[#002366]">{booking.adults} Adults, {booking.children} Children</span>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setBookingStep('details')}
                    className="w-full py-5 bg-[#002366] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#C5A059] transition-all"
                  >
                    Confirm & Enter Details
                  </button>
                </div>
              )}

              {bookingStep === 'details' && (
                <form 
                  onSubmit={handleBookingSubmission} 
                  className="space-y-6"
                  name="deccan-serai-booking"
                  method="POST"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="deccan-serai-booking" />
                  
                  <div className="mb-8">
                    <h3 className="text-3xl font-serif text-[#002366] mb-2">Guest Information</h3>
                    <p className="text-slate-400 text-sm italic">Please provide legal details for a seamless check-in experience.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Full Legal Name</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors"
                        value={guestDetails.fullName}
                        onChange={(e) => setGuestDetails({...guestDetails, fullName: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Cell Number</label>
                      <input 
                        required
                        type="tel" 
                        name="cellNo"
                        placeholder="+91 00000 00000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors"
                        value={guestDetails.cellNo}
                        onChange={(e) => setGuestDetails({...guestDetails, cellNo: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">City of Origin</label>
                      <input 
                        required
                        type="text" 
                        name="origin"
                        placeholder="e.g. Bangalore"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors"
                        value={guestDetails.origin}
                        onChange={(e) => setGuestDetails({...guestDetails, origin: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Residential Address</label>
                      <textarea 
                        required
                        rows={2}
                        name="address"
                        placeholder="Complete address as per ID"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors resize-none"
                        value={guestDetails.address}
                        onChange={(e) => setGuestDetails({...guestDetails, address: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Aadhaar / ID Number</label>
                      <input 
                        required
                        type="text" 
                        name="aadhaarNo"
                        placeholder="XXXX XXXX XXXX"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors"
                        value={guestDetails.aadhaarNo}
                        onChange={(e) => setGuestDetails({...guestDetails, aadhaarNo: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Purpose of Visit</label>
                      <select 
                        required
                        name="purpose"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-[#C5A059] transition-colors"
                        value={guestDetails.purpose}
                        onChange={(e) => setGuestDetails({...guestDetails, purpose: e.target.value})}
                      >
                        <option value="">Select Purpose</option>
                        <option value="Business">Business</option>
                        <option value="Leisure">Leisure</option>
                        <option value="Medical">Medical</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button type="submit" className="w-full py-5 bg-[#002366] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#C5A059] transition-all">
                      Confirm & Send Booking
                    </button>
                  </div>
                </form>
              )}

              {bookingStep === 'sending' && (
                <div className="text-center py-20 space-y-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 border-[3px] border-slate-100 border-t-[#C5A059] rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#002366]">
                      <i className="fas fa-sync text-2xl animate-pulse"></i>
                    </div>
                  </div>
                  <div className="space-y-3 px-4">
                    <h3 className="text-3xl font-serif text-[#002366]">Notifying Concierge...</h3>
                    <p className="text-slate-400 text-sm">We are dispatching your request to the hotel's central reservation desk.</p>
                  </div>
                </div>
              )}

              {bookingStep === 'success' && (
                <div className="py-8">
                  <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-emerald-50 text-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 className="text-4xl font-serif text-[#002366] mb-2">Reservation Request Sent</h3>
                    <p className="text-slate-500 text-sm">The hotel management has been notified of your premium stay.</p>
                  </div>
                  
                  <div className="bg-[#002366] text-white p-8 rounded-[2.5rem] mb-10 border border-[#C5A059]/30 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 bg-[#C5A059] rounded-xl flex items-center justify-center text-[#002366]">
                         <i className="fas fa-envelope-open-text"></i>
                       </div>
                       <h4 className="font-serif text-xl">Hotel Notified</h4>
                    </div>
                    
                    <div className="space-y-6 text-sm">
                      <p className="text-white/60 italic leading-relaxed">
                        A digital briefcase of your details has been sent to <strong>{guestDetails.email}</strong> and the Deccan Serai concierge.
                      </p>
                      
                      <ol className="space-y-4 list-decimal list-inside text-white/90">
                        <li>The reservation team will review your occupancy details.</li>
                        <li>Room allocation is pending final verification.</li>
                        <li className="font-bold text-[#C5A059]">Expect an email from our guest relations team shortly to finalize the deposit.</li>
                      </ol>
                    </div>
                  </div>

                  <button onClick={closeModals} className="w-full py-5 bg-[#C5A059] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Return to Dashboard</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};