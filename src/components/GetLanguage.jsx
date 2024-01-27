const GetLanguage = (language, item) => {
    if (language === 'Gujarati') {
        if ('guj_title' in item) {
            return item.guj_title;
        } else {
            return item.guj_name;
        }
    } else {
        if ('eng_title' in item) {
            return item.eng_title;
        } else {
            return item.eng_name;
        }
    }
}

export default GetLanguage