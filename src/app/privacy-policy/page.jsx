'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const PrivacyPolicy = () => {

    const { SystemSettings } = useSelector((state) => (state.SystemSettings))
    const [PrivacyPolicy, setPrivacyPolicy] = useState(null)

    useEffect(() => {
        const res = SystemSettings.find((item) => item.type === "terms_conditions");
        setPrivacyPolicy(res.data);
    }, []);

  return (
    <div className="container text-white" dangerouslySetInnerHTML={{ __html: PrivacyPolicy || "" }} />
  )
}

export default PrivacyPolicy