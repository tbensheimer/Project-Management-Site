import "./IdleTimer.css"
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import useLogout from "../../hooks/useLogout";

export default function IdleTimer() {
  const [state, setState] = useState('Active')
  const [remaining, setRemaining] = useState(0)
  const {logoutUser} = useLogout();

  const onIdle = () => {
    setState('Idle')
    logoutUser();       //log out if inactive for 8 minutes
  }

  const onActive = () => {
    setState('Active')
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 480_000,   //8 minutes
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <>
      <p className='details'>{state}</p>
      <p className='details'>{remaining} seconds </p>
    </>
  )
}
