'use client'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const TermConditions = () => {

    const { SystemSettings } = useSelector((state) => (state.SystemSettings))
    const [TermConditions, setTermConditions] = useState(null)

    useEffect(() => {
        const res = SystemSettings.find((item) => item.type === "terms_conditions");
        setTermConditions(res.data);
    }, []);

  return (
    <div className="container text-white" dangerouslySetInnerHTML={{ __html: TermConditions || "" }} />
  )
}

export default TermConditions