import Link from 'next/link'
import React from 'react'
import './Navbar.css'
import { BiSearch } from 'react-icons/bi'
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from 'react-icons/ri'
import logo from '@/assets/STV_Logo.png'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav>
            <div className='left'>
                <Image src={logo} alt="logo" width={100} height={100}
 
                />
                <div className='searchbox'>
                    <BiSearch className='searchbtn' />
                    <input type="text" placeholder="Search For a Movie" />
                </div>
            </div>
            <div className='right'>
                <p className='dropdown'>Mumbai<RiArrowDropDownFill className="dropicon" /></p>
                <button className='theme_btn1 linkstylenone' >Logout</button>
                <Link href="/" className='theme btn_1 linkstylenone'></Link>
                <Link href="/" className='linkstylenone'>
                <FaUserCircle  className='theme icon_1'/>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar