const GetCatLanguage = (language, item) => {
    if (language === 'Gujarati') {
        if ('guj_title' in item.category) {
            return item.category.guj_title;
        } else {
            return item.category.guj_name;
        }
    } else {
        if ('eng_title' in item.category) {
            return item.category.eng_title;
        } else {
            return item.category.eng_name;
        }
    }
}

export default GetCatLanguage