import React from 'react'

const FeatureCard = ({title,description}) => {
  return (
    <>
    <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-md text-center backdrop-blur-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm mt-2">{description}</p>
    </div>
    </>
  )
}

export default FeatureCard