import React from 'react'
import './Container.css'

export default function Container() {
  return (
    <div className='container'>
      <TopBar></TopBar>
      <div className='center'>
        <SideBar></SideBar>
        <Main></Main>
      </div>
    </div>
  )
}

function TopBar(props) {
  return (
    <div className='topbar'>111</div>
  )
}
function SideBar(props) {
  return (
    <div className='sidebar'>222</div>
  )
}
function Main(props) {
  return (
    <div className='main'>333</div>
  )
}
