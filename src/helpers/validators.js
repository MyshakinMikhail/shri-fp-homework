/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
    if (triangle !== "white" || circle !== "white") {
        return false;
    }

    return star === "red" && square === "green";
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle];
    const greenCount = colors.filter((color) => color === "green").length;
    return greenCount >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle];
    const redCount = colors.filter((color) => color === "red").length;
    const blueCount = colors.filter((color) => color === "blue").length;
    return redCount === blueCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({ star, square, triangle, circle }) => {
    return (
        star === "red" &&
        square === "orange" &&
        circle === "blue" &&
        (triangle !== "white" || triangle !== "red" || triangle !== "blue")
    );
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle];
    const colorCount = colors.reduce((acc, color) => {
        if (color !== "white") {
            acc[color] = (acc[color] || 0) + 1;
        }
        return acc;
    }, {});
    const nonWhiteColors = Object.keys(colorCount).filter(
        (color) => colorCount[color] >= 3
    );
    return nonWhiteColors.length > 0;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle];
    const greenCount = colors.filter((color) => color === "green").length;
    const redCount = colors.filter((color) => color === "red").length;
    const triangleIsGreen = triangle === "green";

    return greenCount === 2 && redCount === 1 && triangleIsGreen;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle];
    return colors.every((color) => color === "orange");
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({ star }) => {
    if (star === "red" || star === "white") {
        return false;
    }

    return true;
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) => {
    const colors = [star, square, triangle, circle];
    return colors.every((color) => color === "green");
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ square, triangle }) => {
    const triangleColor = triangle;
    const squareColor = square;

    if (triangleColor === "white" || squareColor === "white") {
        return false;
    }

    return triangleColor === squareColor;
};
