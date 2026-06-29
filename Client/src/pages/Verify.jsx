import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, ShieldCheck, RotateCcw } from 'lucide-react'

export default function App() {
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState(30)
  const inputRefs = useRef([])

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft === 0) {return}

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) {return false}

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    // Auto-focus next box
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Backspace handling
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const verificationCode = otp.join('')
    console.log('Verifying Code:', verificationCode)
    alert(`Verifying Code: ${verificationCode}`)
  }

  const handleResend = () => {
    setTimeLeft(30)
    setOtp(new Array(6).fill(''))
    inputRefs.current[0].focus()
    console.log('OTP Resent successfully!')
  }

  return (
    // Global Screen Wrapper (Dark background, Centered layout)
    <div className="bg-[#060913] min-h-screen w-screen flex items-center justify-center relative overflow-y-auto px-4 py-6 antialiased select-none font-sans">
      {/* Decorative Background Neon Ambient Orbs */}
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 top-[-50px] left-[-50px] bg-[#6366f1]"></div>
      <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 bottom-[-50px] right-[-50px] bg-[#a855f7]"></div>

      {/* --- VERIFICATION CARD --- */}
      <div className="bg-[#0b1324] border border-[#1e293b] rounded-[20px] px-7 py-10 w-full max-w-[440px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] z-10 relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#6366f1]/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(99,102,241,0.1)]">
        {/* Branding & Header Section */}
        <div className="text-center mb-8">
          <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 w-14 h-14 rounded-[14px] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck
              className="drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              size={24}
              color="#818cf8"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white m-0 tracking-[1px]">Verify Email</h1>
          <p className="text-[13.5px] text-[#94a3b8] mt-2 m-0 leading-relaxed">
            We've sent a 6-digit code to your inbox
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="flex flex-col gap-7">
          {/* OTP Code Boxes Wrapper - spelling fixed to grid-template-columns */}
          <div className="grid grid-cols-6 gap-2 justify-center w-full">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                required
                className="w-full h-13 bg-[#060913] border border-[#1e293b] rounded-v10 rounded-xl text-xl font-bold text-white text-center outline-none box-border transition-all duration-200 ease-in-out hover:border-white/40 focus:border-white focus:bg-[#090e1e] focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] focus:scale-[1.04]"
              />
            ))}
          </div>

          {/* Premium Glowing Verification Button */}
          <button
            type="submit"
            className="group/btn bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white border-none py-3.5 px-4 rounded-xl text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(99,102,241,0.55)]"
          >
            <span>Verify Code</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-[3px]"
            />
          </button>
        </form>

        {/* Dynamic Resend & Timer Section */}
        <div className="mt-7 text-center">
          {timeLeft > 0 ? (
            <p className="text-[13.5px] text-[#94a3b8] m-0">
              Resend code in{' '}
              <span className="text-white font-bold font-mono">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </p>
          ) : (
            <p className="text-[13.5px] text-[#94a3b8] m-0">
              Didn't receive the code?{' '}
              <button
                type="button"
                className="bg-none border-none text-[#6366f1] text-[13.5px] font-semibold cursor-pointer inline-flex items-center gap-1 p-0 ml-1.5 transition-all duration-200 hover:text-[#a855f7] hover:underline"
                onClick={handleResend}
              >
                <RotateCcw size={12} />
                <span>Resend Code</span>
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
