const GetFirstWord = (paragraph) => {
    const words = paragraph.trim().split(' ');
    return words[0];
}

export default GetFirstWord