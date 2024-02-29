const GetCatLanguage = (language, item) => {
    if (language === 'Gujarati') {
        return item.category.guj_title || item.category.guj_name
    } else {

        return item.category.eng_title || item.category.eng_name
    }
}

export default GetCatLanguage