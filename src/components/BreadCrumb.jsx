'use client'
import Link from "next/link"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const BreadCrumb = ({ title, category, subcategory, link1, link2 }) => {

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link href="/">{t('Home')}</Link>
                    </li>
                    <li className={`breadcrumb-item ${category ? "" : "active"}`} aria-current="page">
                        {link1 ? (
                            <Link href={link1}>{title}</Link>
                        ) : (
                            <span>{title}</span>
                        )}
                    </li>
                    {category &&
                        <li className={`breadcrumb-item ${subcategory ? "" : "active"}`} aria-current="page">
                            {link2 ? (
                                <Link href={link2}>{category}</Link>
                            ) : (
                                <span>{category}</span>
                            )}
                        </li>
                    }
                    {subcategory &&
                        <li className={`breadcrumb-item ${subcategory ? "active" : ""}`} aria-current="page">
                            {subcategory}
                        </li>
                    }
                </ol>
            </nav>
        </>
    )
}

export default withTranslation()(BreadCrumb)