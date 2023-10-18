module.exports.difficultyLevelOptions = (difficultyLevel) => {
    const titles = [
        "Easy",
        "Medium (Standard 3x3)",
        "Intermediate",
        "Expert",
        "Hardcore"
    ]

    const options = titles.map((title, index) => {

        const numLabel = index+1;

        return{
            title: `${numLabel} - ${title}` ,
            value: numLabel,
            selected: Number(difficultyLevel) === numLabel ? "selected" : ""
        }
    })

    return options;
};

