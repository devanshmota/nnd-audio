const GetLanguage = (language, item) => {
    // if (language === 'Gujarati') {
    //     if ('guj_title' in item) {
    //         return item.guj_title;
    //     } else {
    //         return item.guj_name;
    //     }
    // } else {
    //     if ('eng_title' in item) {
    //         return item.eng_title;
    //     } else {
    //         return item.eng_name;
    //     }
    // }



    if (language === 'Gujarati') {
        return item.guj_title || item.guj_name;
    } else {
        return item.eng_title || item.eng_name;
    }

}

export default GetLanguage