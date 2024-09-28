import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus"

function ConnectModel({ 
  name,
  description,
  banner,
  avatar,
  mutualConnectionImg = "",
  mutualConnections = "",
  profileId,
 }) {
  return (
    <div className="max-[400px]:min-w-[150px] max-[400px]:max-w-[150px] min-w-[184px] max-w-[184px] h-72 rounded-md shadow-sm hover:shadow-[0px_3px_4px_1px_#b6b6b6] relative border-[1px] border-gray-300 border-opacity-90 transition-shadow ease-in duration-100">
      <div className="banner-image">
        <img src={banner} alt="" className="w-full h-16 object-cover rounded-t-md" />
      </div>
      <Link to={`/${profileId}`}>
        <div className="avatar flex justify-center items-center">
          <img src={avatar} alt="" className="rounded-full w-24 absolute" />
        </div>
        <div className="names mt-14 px-2 flex items-center justify-center flex-col">
          <h3 className="font-semibold">{name}</h3>
          <div className="font-thin text-center min-h-11 overflow-hidden line-clamp-2 break-words leading-5">
           {description}
          </div>
        </div>
      </Link>
      <div className="bottom px-2 mt-2">
        <div className="min-h-11">
          {mutualConnectionImg ? (
            <div className="mutual-img flex items-center">
              <img src={mutualConnectionImg} alt="" className=" rounded-full h-6 w-6 " />
              <div className="mutual_names font-thin text-[0.8rem] leading-4 line-clamp-2">
                {mutualConnections}
              </div>
            </div>
          ) : (
            <div className="font-thin text-[0.8rem] leading-4 line-clamp-2 text-center">
              Based on your profile
            </div>
          )}
        </div>
        <div className="button">
          <button className="text-[#0a66c2] border-[#0a66c2] border-[1.5px] border-solid rounded-[1rem] w-full py-[1px] font-semibold hover:bg-[#e7e7e7] hover:border-[2px] transition-all duration-100 ease-linear h-[30px]">
            <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4 mr-1" />
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectModel
