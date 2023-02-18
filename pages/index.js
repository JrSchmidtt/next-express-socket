
import styled from "styled-components"
import io from "socket.io-client"
import { useEffect } from "react"

let socket

export default function Home() {
  useEffect(() => {
    socket = io("http://localhost:3000/api/socket")
    socket.on("connect", () => {
      console.log("connected")
    })
  }, [])
  
  return (
    <>
      <Title>Hello World</Title>
    </>
  )
}

const Title = styled.h1`
  color: red;
`
